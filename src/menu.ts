import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import Options from './options.js';
import Option from './option.js';
import Input from './input.js';
import assertSlot from './library/assert-slot.js';
import styles from './menu.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu': Menu;
  }
}

// TODO: should disabled options be able to receive focus via focus()
// TODO: handle disabled options everywhere, like i did in Dropdown
// TODO: Design needs to be happy with submenu positoning. they're next to the submenu item not the item
// TODO: change instances of combobox to filterable
// TODO: test submenu target being disabled programmatically and initially
// TODO: test filterable insertion point stuff
// TODO: test option disabgled programmatically
// TODO: handle scrolling option into view and test

/**
 * @attr {boolean} [loading=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element}
 * @slot {Element} [target] - The element to which the popover will anchor. Can be any focusable element.
 *
 * @fires {Event} toggle
 */
@customElement('glide-core-menu')
@final
export default class Menu extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get loading(): boolean {
    return this.#isLoading;
  }

  set loading(isLoading: boolean) {
    this.#isLoading = isLoading;

    if (this.#optionsElement && this.#targetElement) {
      this.#optionsElement.privateLoading = isLoading;

      this.#targetElement.ariaDescription = isLoading
        ? this.#localize.term('loading')
        : null;
    }
  }

  /**
   * @default 4
   */
  @property({ reflect: true, type: Number })
  get offset(): number {
    return (
      this.#offset ??
      Number.parseFloat(
        window
          .getComputedStyle(document.body)
          .getPropertyValue('--glide-core-spacing-base-xxs'),
      ) *
        Number.parseFloat(
          window.getComputedStyle(document.documentElement).fontSize,
        )
    );
  }

  set offset(offset: number) {
    this.#offset = offset;
  }

  /**
   * @default false
   */
  @property({ reflect: true, type: Boolean })
  get open(): boolean {
    return this.#isOpen;
  }

  set open(isOpen) {
    const hasChanged = isOpen !== this.#isOpen;
    this.#isOpen = isOpen;

    if (isOpen && hasChanged && !this.isTargetDisabled) {
      this.#show();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    } else if (hasChanged) {
      this.#hide();

      this.dispatchEvent(
        new Event('toggle', { bubbles: true, composed: true }),
      );
    }
  }

  @property({ reflect: true, useDefault: true })
  placement:
    | 'bottom'
    | 'left'
    | 'right'
    | 'top'
    | 'bottom-start'
    | 'bottom-end'
    | 'left-start'
    | 'left-end'
    | 'right-start'
    | 'right-end'
    | 'top-start'
    | 'top-end' = 'bottom-start';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    // Guarding against `this.#isSubmenu` isn't strictly necessary. It's guarded against to prevent
    // subtle bugs being introduced later. It's hard to say what those bugs would be. But given the
    // complexity of event handling throughout, it seems prudent to only handle document clicks for
    // the top-level menu.
    //
    // Additionally, not handling document clicks for submenus makes things overall easier to
    // understand. Plus we use slightly less memory.
    if (!this.#isSubmenu) {
      // 1. The consumer has a "click" handler on Menu's target.
      // 2. The user clicks the target.
      // 3. The handler is called and sets `this.open` to `true`.
      // 4. The "click" event bubbles up and is handled by `#onDocumentClick()`.
      // 5. That handler sets `open` to `false` because the click came from outside Menu.
      // 6. Menu is opened then closed in the same tick and so never opens.
      //
      // `capture` ensures `#onDocumentClick()` is called before #3, so that `this.open`
      // being set `true` in the consumer's handler isn't overwritten by this handler
      // setting it to `false`.
      document.addEventListener('click', this.#onDocumentClick, {
        capture: true,
      });
    }
  }

  override createRenderRoot() {
    this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
    return this.#shadowRoot;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    if (this.#optionsElement && this.#targetElement) {
      this.#optionsElement.privateLoading = this.loading;

      this.#targetElement.ariaDescription = this.loading
        ? this.#localize.term('loading')
        : null;
    }

    if (this.open && !this.isTargetDisabled) {
      const openedSubmenus = this.#submenus.filter(({ open }) => open);

      if (openedSubmenus.length > 1) {
        for (const [index, submenu] of openedSubmenus.entries()) {
          if (index !== 0) {
            // We have to close all but one submenu so they don't overlap, and because it wouldn't
            // be clear to us or the user which open submenu keyboard interactions should affect.
            //
            // Keeping either the first or the last open submenu open is reasonable. So we arbitrarily
            // keep the first one open.
            submenu.open = false;
          }
        }
      }
    } else if (!this.open || this.isTargetDisabled) {
      for (const submenu of this.#submenus) {
        if (submenu.open) {
          // We have to do something if one or more submenus are initially open and the top-level
          // menu is not.
          //
          // We certainly have to close all but one of them so they don't overlap, and because
          // it wouldn't be clear to us or the user which open submenu keyboard interactions should
          // affect. Additionally, which one should we keep open?
          //
          // And what if we keep one open but the top-level menu isn't initially open? Then, when
          // the top-level menu is opened, it'll appear on top of the submenu because the top-level
          // menu was opened second.
          //
          // So we'd have to toggle the submenu's `open` property. But the then submenu would dispatch
          // "toggle" events, sending a false signal to consumers that the user closed then reopened
          // the submenu.
          //
          // Alternatively, we could rename `#show()` and `#hide()` to `privateShow()` and `privateHide()`,
          // and the top-level menu could call those methods to avoid triggering "toggle" events.
          //
          // Then again, what is the use case for having a submenu open when the top-level menu isn't open?
          // It's possible one exists. However, until such a case presents itself, closing every initially
          // submenu when the top-level menu isn't open is the simplest approach.
          //
          // `this.#submenus` is an array of only the current menu's submenus. So you may wonder how
          // submenus of those submenus get closed. They're closed via `#hide()`, which necessarily
          // closes submenus when their parent menu is hidden.
          submenu.open = false;
        }
      }
    }

    if (this.#defaultSlotElementRef.value) {
      // `popover` is used so the options can break out of Modal or another container
      // that has `overflow: hidden`. Elements with `popover` are positioned relative
      // to the viewport. Thus Floating UI in addition to `popover`.
      //
      // "manual" is set here instead of in the template to escape Lit Analyzer, which isn't
      // aware of `popover` and doesn't have a way to disable a rule ("no-unknown-attribute").
      //
      // "manual" instead of "auto" because the latter means only one popover can be open
      // at a time. Consumers, however, may have popovers in own components that need to be
      // open while this one is open.
      //
      // "auto" also automatically opens the popover when its target is clicked. We want
      // it to remain closed when clicked when there are no options or the target is disabled.
      this.#defaultSlotElementRef.value.popover = 'manual';

      if (this.open && !this.isTargetDisabled) {
        this.#show();
      }
    }
  }

  private get isTargetDisabled() {
    const isDisabled =
      this.#targetElement &&
      'disabled' in this.#targetElement &&
      this.#targetElement.disabled;

    const isAriaDisabled =
      this.#targetElement && this.#targetElement.ariaDisabled === 'true';

    return Boolean(isDisabled) || Boolean(isAriaDisabled);
  }

  override render() {
    // The linter wants a "focus" handler on the slot and "focusin" doesn't satisfy it.
    //
    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`
      <div
        @focusout=${this.#onComponentFocusout}
        ${ref(this.#componentElementRef)}
      >
        <slot
          class=${classMap({
            'target-slot': true,
            open: this.open,
          })}
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onSlotKeydown}
          @mouseup=${this.#onTargetSlotMouseUp}
          @input=${this.#onSlotInput}
          @slotchange=${this.#onTargetSlotChange}
          ${assertSlot([Element])}
          ${ref(this.#targetSlotElementRef)}
        >
          <!--
            The element to which the popover will anchor. Can be any focusable element.
            @type {Element}
          -->
        </slot>

        <slot
          class="default-slot"
          @click=${this.#onDefaultSlotClick}
          @focusin=${this.#onDefaultSlotFocusin}
          @keydown=${this.#onSlotKeydown}
          @mousedown=${this.#onDefaultSlotMouseDown}
          @mouseover=${this.#onDefaultSlotMouseOver}
          @mouseup=${this.#onDefaultSlotMouseUp}
          @private-disabled-change=${this.#onDefaultSlotDisabledChange}
          @private-slot-change=${this.#onDefaultSlotSlotChange}
          @toggle=${this.#onDefaultSlotToggle}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!--
            @required
            @type {Element}
          -->
        </slot>
      </div>
    `;
  }

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  // Set in `#onTargetSlotMouseUp()`. Used in `#onDocumentClick()` to guard against Menu
  // closing when the border or padding of `.default-slot` is clicked. The event will be
  // retargeted to the light DOM when it's picked up by `#onDocumentClick()`. So simply
  // checking in `#onDocumentClick()` if the click's `event.target` is the default slot
  // won't do.
  #isDefaultSlotClick = false;

  #isLoading = false;

  #isOpen = false;

  // Set in `#onDefaultSlotToggle()`. Used in `#onSlotKeydown()` to guard against redispatching
  // the event to a submenu when one isn't open. Also used in `connectedCallback()` to guard
  // against listening for document clicks for submenus.
  #isSubmenuOpen = false;

  // Set in `#onTargetSlotMouseUp()` and `#onDocumentClick()`, and used in `#onDocumentClick()`:
  //
  // 1. Menu is open.
  // 2. User clicks Menu's target.
  // 3. `#onDocumentClick()` sets `this.open` to `false.`
  // 4. `#onTargetSlotClick()` sets `this.open` to true`.
  // 5. Menu never closes.
  //
  // Setting `#isTargetSlotMouseUp` to `true` in `#onTargetSlotMouseUp()` gives
  // `#onDocumentClick()` the information it needs to not set `this.open` to `false.
  //
  // A more straightforward approach would be to set an `#isTargetSlotClick` property
  // in `#onTargetSlotClick()`. But `#onDocumentClick()` listens for clicks in their
  // capture phase. So `#onDocumentClick()` would be called before `#onTargetSlotClick()`.
  //
  // Note too that `#onDocumentClick()` sets `#isTargetSlotMouseUp` to false instead of
  // `#onTargetSlotClick()` doing it. That's so `#isTargetSlotMouseUp` is set to `false`
  // even if the user mouses down on Menu's target then moves his mouse to something
  // else before mousing up.
  #isTargetSlotMouseUp = false;

  #localize = new LocalizeController(this);

  #offset: number | undefined;

  // Used in various situations to reactivate the previously active option.
  #previouslyActiveOption?: Option | null;

  #shadowRoot?: ShadowRoot;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  get #activeOption() {
    return this.#optionElements?.find(({ privateActive }) => privateActive);
  }

  get #activeOptionSubmenu() {
    return this.#activeOption?.querySelector('glide-core-menu');
  }

  get #firstEnabledOption() {
    return this.#optionElements?.find(({ disabled }) => !disabled);
  }

  get #lastEnabledOption() {
    return this.#optionElements?.findLast(({ disabled }) => !disabled);
  }

  get #isFilterable(): boolean {
    let isKeepLooking = true;

    // eslint-disable-next-line @typescript-eslint/no-this-alias, unicorn/no-this-assignment
    let topLevelMenu: Menu = this;

    while (isKeepLooking) {
      const menu = topLevelMenu.parentElement?.closest('glide-core-menu');
      isKeepLooking = Boolean(menu);

      if (menu) {
        topLevelMenu = menu;
      }
    }

    const slottedTarget = topLevelMenu?.querySelector('[slot="target"]');

    const target =
      slottedTarget instanceof HTMLSlotElement
        ? slottedTarget?.assignedElements().at(0)
        : slottedTarget;

    return target instanceof Input;
  }

  get #isSubmenu() {
    return Boolean(
      this.closest('glide-core-menu')?.parentElement?.closest(
        'glide-core-menu',
      ),
    );
  }

  get #isTargetSpanOrDivOrSvg() {
    return (
      this.#targetElement instanceof HTMLSpanElement ||
      this.#targetElement instanceof HTMLDivElement ||
      this.#targetElement instanceof SVGElement
    );
  }

  get #openedSubmenu() {
    return this.#submenus.find(({ open }) => open);
  }

  get #optionsElement() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements({ flatten: true })
      ?.find((element): element is Options => element instanceof Options);
  }

  get #optionElements() {
    // TODO: make sure to handle case where slot is placed inside options
    // TODO: rework comment
    // If we're dealing with a slot, then the consumer of this component has
    // placed a slot inside Menu Options, in which case we need to get its
    // assigned elements instead.

    // TODO: explain. case where a slot is in Menu's default slot.
    if (this.#optionsElement) {
      return [...this.#optionsElement.children]
        .flatMap((element) => {
          return element instanceof HTMLSlotElement
            ? element.assignedElements()
            : element;
        })
        ?.filter((element): element is Option => {
          return element instanceof Option;
        });
    }
  }

  get #submenus() {
    return [
      ...this.querySelectorAll<Menu>(
        // The "content" slot case.
        ':scope > glide-core-options > glide-core-option > [slot="content"] > glide-core-menu',
      ),
      ...this.querySelectorAll<Menu>(
        // The "content" slot fallback case.
        ':scope > glide-core-options > glide-core-option > [slot="submenu"]',
      ),
    ];
  }

  get #targetElement() {
    const element = this.#targetSlotElementRef.value
      ?.assignedElements({ flatten: true })
      .at(0);

    if (element instanceof HTMLElement || element instanceof SVGElement) {
      return element;
    }
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = (event: Event) => {
    // When an option is clicked, the option stops the event from propagating and calls
    // `click()` on itself so `event.target` is set to the option and not to an icon or
    // other slotted content. That way, consumers listening for option clicks don't have
    // to always call `event.target.closest('glide-core-option')` before checking
    // `event.target.value` or `event.target.value` to see which option was clicked.
    //
    // Guarding against `event.isTrusted` is an admittedly hackily and not entirely robust
    // heuristic for determining if the click came from an option calling `click()` on
    // itself. TODO: say more.
    if (!event.isTrusted) {
      return;
    }

    if (this.#isDefaultSlotClick) {
      this.#isDefaultSlotClick = false;

      return;
    }

    if (this.#isTargetSlotMouseUp) {
      // TODO: say why set here instead of in targetClick
      this.#isTargetSlotMouseUp = false;
      return;
    }

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    for (const submenu of this.#submenus) {
      submenu.open = false;
    }

    this.open = false;
  };

  // TODO: say why private. because consumer controls target and can focus it without a method on Menu
  #focus(options?: FocusOptions) {
    if (this.#targetElement && 'focus' in this.#targetElement) {
      (
        this.#targetElement as { focus: (options?: FocusOptions) => void }
      )?.focus(options);
    }
  }

  #hide() {
    this.#cleanUpFloatingUi?.();
    this.#defaultSlotElementRef.value?.hidePopover();

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded = 'false';
    }

    if (this.#activeOption) {
      this.#previouslyActiveOption = this.#activeOption;
      this.#activeOption.privateActive = false;
    }

    for (const submenu of this.#submenus) {
      submenu.open = false;
    }
  }

  #onComponentFocusout(event: FocusEvent) {
    // TODO: what if focus is moved from an SVG, which isn't an HTMLElement?
    const isMenuFocused =
      event.relatedTarget instanceof HTMLElement &&
      this.#shadowRoot?.contains(event.relatedTarget);

    const isOptionsFocused = event.relatedTarget instanceof Options;

    const isOptionFocused = this.#optionElements?.some(
      (option) => option === event.relatedTarget,
    );

    if (!isMenuFocused && !isOptionsFocused && !isOptionFocused) {
      this.open = false;
    }
  }

  #onDefaultSlotClick(event: Event) {
    // TODO: why wait a tick? so consumers can listen for the event on menu on cancel it to stop
    // menu from closing
    setTimeout(() => {
      // SVGs don't have a `closest()` method. But they are valid targets because the
      // consumer and add a `role="button"` to them. So, when we're dealing with an
      // SVG, we get its parent element, which will have a `closest()` method.
      const target =
        event.target instanceof SVGElement
          ? event.target.parentElement
          : event.target;

      const isOptionClick = event.target instanceof Option;

      const isSubmenuTargetClick =
        target instanceof Element && Boolean(target.closest('[slot="target"]'));

      const isSubmenuMenuClick = target instanceof Menu;

      if (
        // `isOptionClick` is guarded against so Menu doesn't close when Menu's border or
        // padding is clicked. Or, for example, when a horizontal rule or option grouping
        // element is clicked.
        isOptionClick &&
        !event.defaultPrevented &&
        !isSubmenuTargetClick &&
        !isSubmenuMenuClick
      ) {
        this.open = false;
      }
    });
  }

  #onDefaultSlotDisabledChange(event: Event) {
    if (
      this.#activeOption === event.target &&
      event.target instanceof Option &&
      event.target.disabled &&
      this.#optionElements
    ) {
      const activeOptionIndex = this.#optionElements.indexOf(
        this.#activeOption,
      );

      const nextEnabledOption = this.#optionElements?.find(
        ({ disabled }, index) => {
          return !disabled && index > activeOptionIndex;
        },
      );

      if (nextEnabledOption && this.#optionsElement) {
        this.#previouslyActiveOption = this.#activeOption;
        this.#activeOption.privateActive = false;
        this.#optionsElement.ariaActivedescendant = nextEnabledOption.id;

        nextEnabledOption.privateActive = true;

        return;
      }

      const previousEnabledOption = this.#optionElements.findLast(
        ({ disabled }, index) => {
          return !disabled && index < activeOptionIndex;
        },
      );

      if (previousEnabledOption && this.#optionsElement) {
        this.#previouslyActiveOption = this.#activeOption;
        this.#activeOption.privateActive = false;
        this.#optionsElement.ariaActivedescendant = previousEnabledOption.id;

        previousEnabledOption.privateActive = true;
      }
    }
  }

  // TODO: say why this handler is needed
  #onDefaultSlotFocusin(event: FocusEvent) {
    // TODO: handle SVG case
    // TODO: is this named correctly?
    const isTargetSubmenuMenuTarget =
      event.target instanceof Element &&
      event.target.closest('glide-core-menu') !== this;

    if (
      !isTargetSubmenuMenuTarget &&
      event.target instanceof Option &&
      !event.target.disabled &&
      this.#activeOption &&
      this.#optionsElement
    ) {
      this.#activeOption.privateActive = false;
      this.#optionsElement.ariaActivedescendant = event.target.id;

      event.target.privateActive = true;
    }
  }

  #onDefaultSlotMouseDown(event: Event) {
    // So the `#onFocusout()` handler, which closes Menu, isn't called when the
    // border or padding on `.default-slot` is clicked. Also so clicking an option
    // doesn't move focus to the option. TODO: say more
    //
    // TODO: if this stays, remoev focus() calls
    event.preventDefault();
  }

  #onDefaultSlotMouseOver(event: Event) {
    const isOwnOption = this.#optionElements?.some(
      (option) => option === event.target,
    );

    // This handler is also called when a submenu option is hovered. If that's
    // the case, we don't want to deactivate the currently active option.
    if (
      isOwnOption &&
      event.target &&
      event.target instanceof Option &&
      !event.target.disabled
    ) {
      this.#previouslyActiveOption = this.#activeOption;

      if (this.#activeOption) {
        this.#activeOption.privateActive = false;
      }

      event.target.privateActive = true;

      if (this.#optionsElement) {
        this.#optionsElement.ariaActivedescendant = event.target.id;
      }
    }
  }

  #onDefaultSlotMouseUp() {
    this.#isDefaultSlotClick = true;
  }

  #onDefaultSlotSlotChange() {
    const wasActiveOptionRemoved = this.#optionElements?.every(
      (option) => option !== this.#activeOption,
    );

    if (wasActiveOptionRemoved && this.#firstEnabledOption) {
      this.#firstEnabledOption.privateActive = true;
    }
  }

  #onDefaultSlotToggle(event: Event) {
    this.#isSubmenuOpen = this.#submenus.some(({ open }) => open);

    if (event.target instanceof Menu) {
      for (const submenu of this.#submenus) {
        const isOwnSubmenu = this.#submenus.includes(event.target);

        // Menu can have more than one option with a submenu. If this event was a result of
        // a submenu being opened and another submenu is open, we close the already open submenu.
        //
        // Submenus of a submenu also dispatch "toggle" events. So we guard against closing them
        // via `isOwnSubmenu`.
        if (
          isOwnSubmenu &&
          submenu !== event.target &&
          submenu.open &&
          event.target.open
        ) {
          submenu.open = false;
        }
      }
    }
  }

  // This handler in addition to the "keydown" one because entering characters into
  // the input field should open Menu. An "input" handler is an easy way to filter
  // out non-character input.
  #onSlotInput() {
    this.open = true;
  }

  // TODO: say why this handler is on both slots
  #onSlotKeydown(event: KeyboardEvent) {
    // If the event's target isn't this Menu's target, then the event came from the target
    // of a submenu, in which case it shouldn't affect the state of this Menu. So we return.
    //
    // Returning also prevents a loop where the event is redispatched on the submenu then
    // picked up again by its parent Menu, and on and on.
    // TODO: sub-Menu throughout?
    if (event.target !== this.#targetElement) {
      return;
    }

    if (this.#isSubmenuOpen) {
      const subevent = new KeyboardEvent(event.type, {
        bubbles: true,
        key: event.key,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
        cancelable: true,
      });

      // The event is dispatched on `this.#openedSubmenu` instead of `#activeOptionSubmenu` because
      // they may not be the same, and `#activeOptionSubmenu` may not even be open. Imagine a
      // situation where Menu has two options ("One", "Two") each with a sub-Menu:
      //
      // 1. User activates "Two" by hovering it.
      // 2. User opens the sub-Menu of "Two".
      // 3. User activates "One" by hovering it.
      // 4. User presses ArrowUp or ArrowDown.
      //
      // `#activeOptionSubmenu` would be "One". But "One" isn't open and isn't the submenu the user
      // is intending to interact with.
      //
      // Normally this rule makes sense. But here we're not dispatching an event for consumers, so
      // it doesn't belong in the JSDoc comment. We're simply redispatching an event from the user.
      //
      // eslint-disable-next-line @crowdstrike/glide-core/event-dispatch-from-this
      this.#openedSubmenu
        ?.querySelector('[slot="target"]')
        ?.dispatchEvent(subevent);

      // The event is canceled under certain conditions and in a couple situations:
      //
      // 1. When the user presses ArrowRight or ArrowLeft, top-level Menu's target is an input field,
      //    and the active option has submenu. The event is canceled to prevent the insertion point
      //    from moving in addition to the submenu opening or closing.
      //
      // 2. When the user presses ArrowRight or ArrowLeft and Menu's target is not an input field.
      //    The event is canceled to prevent the page from scrolling to the left or right.
      //
      // 3. When the user presses ArrowUp, ArrowDown, PageUp, Page Down, Home, or End. The event is
      //    canceled to prevent page scroll and to prevent the insertion point from moving.
      //
      // The dispatch above is synchronous. The handling of the dispatched event (the logic below this
      // condition) is also synchronous. That means this entire handler will have run again for the
      // submenu the moment the subevent is dispatched above. So the submenu (or sub-submenu) will have
      // had a chance to cancel the event by the time we've arrived here. The reason the submenu
      //
      // Canceling the event if its subevent is canceled allows the cancelation to propagate back up
      // to original event: the one dispatched on the top-level Menu's target.
      if (subevent.defaultPrevented) {
        event.preventDefault();
      }

      return;
    }

    // SPANs, DIVs, and SVGs don't emit "click" events on Enter and Space. If they did,
    // Menu would be opened by `#onTargetSlotClick()` and we wouldn't have to open it here.
    if (
      !this.open &&
      [' ', 'Enter'].includes(event.key) &&
      this.#isTargetSpanOrDivOrSvg
    ) {
      event.preventDefault(); // Prevent page scroll.

      this.open = true;

      return;
    }

    if (!this.open && event.key === ' ' && this.#isFilterable) {
      // Normally, pressing Space produces a "click" event and Menu is opened via
      // `#onTargetSlotClick()`. Pressing Space in an input field, however, doesn't.
      // So we have to open Menu in this handler.
      //
      // The event is canceled because, as elsewhere, a single user interaction shouldn't
      // produce multiple interface changes. So, if Menu is closed, pressing Space
      // shouldn't both insert a space and open Menu.
      event.preventDefault();

      this.open = true;
    }

    if (
      !this.open &&
      ['ArrowUp', 'ArrowDown'].includes(event.key) &&
      this.#optionsElement
    ) {
      // - Prevents page scroll when Menu is filterable.
      // - Prevents the insertion point from moving when Menu is filterable.
      event.preventDefault();

      this.open = true;

      return;
    }

    if (this.open && event.key === 'Escape') {
      event.preventDefault(); // Prevent Safari from leaving full screen.

      this.open = false;

      // For VoiceOver. Options normally don't receive focus. But VoiceOver
      // can focus them programmatically. So we move focus back to the target
      // now that Menu is closed.
      // TODO: explain
      // TODO: check if option has focus before calling this?
      // TODO: why exclude submenu. and how does this work if i'm stopping propagation?
      // TODO: test this?
      if (!this.#isSubmenu) {
        this.#focus();
      }

      return;
    }

    if (this.open && event.key === 'ArrowRight' && !event.metaKey) {
      if (this.#activeOptionSubmenu) {
        // If the active option has a submenu, the user expects ArrowRight to open the
        // submenu and not to also move the insertion point.
        // TODO: test this. what else?
        event.preventDefault();

        this.#activeOptionSubmenu.open = true;
      } else if (!this.#isFilterable) {
        event.preventDefault(); // Prevent page scroll.
      }

      return;
    }

    if (this.open && event.key === 'ArrowLeft' && !event.metaKey) {
      if (this.#isSubmenu) {
        // If we're in a submenu, the user expects ArrowLeft to close the submenu and not
        // to also move the insertion point.
        event.preventDefault();

        this.open = false;

        // TODO:  say why here and above why this condition
      } else if (!this.#isFilterable) {
        event.preventDefault(); // Prevent page scroll.
      }

      return;
    }

    if (this.open && event.key === 'Enter') {
      if (!this.#isFilterable) {
        // TODO: adjust comments to account for combobox
        // Enter and Space will produce a "click" event. But so will `#activeOption?.click()`
        // below. Canceling this click simplifies logic elsewhere in this component so that we
        // don't have to account for two successive clicks. Emitting a single click is also
        // likely less confusing to consumers.
        event.preventDefault();

        // TODO: why is this conditional here and not after the click below?
        // TODO: explain this better. why is menu closed? also, should this apply to role="combobox"?
        // For VoiceOver. Options normally don't receive focus. But VoiceOver
        // can focus them programmatically. So we move focus back to the target
        // now that Menu is closed.
        // TODO: only call if an option has focus?
        this.#focus();
      }

      // The option is clicked here and below so the event's `target` is set to the option.
      // That way consumers listening for the "click" event know which option was selected.
      this.#activeOption?.click();

      return;
    }

    // Menu being filterable is guarded against because pressing Space is meant
    // to insert a space and not select an option.
    if (this.open && event.key === ' ' && !this.#isFilterable) {
      event.preventDefault(); // Prevent page scroll.

      this.#activeOption?.click();

      return;
    }

    if (this.open && this.#activeOption && this.#optionElements) {
      const activeOptionIndex = this.#optionElements.indexOf(
        this.#activeOption,
      );

      if (event.key === 'ArrowUp' && !event.metaKey) {
        const previousOption = this.#optionElements.findLast(
          (option, index) => {
            return !option.disabled && index < activeOptionIndex;
          },
        );

        if (this.#isFilterable && previousOption) {
          // Prevent the insertion point from moving to the beginning of the input field.
          event.preventDefault();
        } else if (!this.#isFilterable) {
          // Prevent page scroll.
          event.preventDefault();
        }

        if (previousOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = previousOption.id;

          previousOption.privateActive = true;
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey) {
        const nextOption = this.#optionElements.find((option, index) => {
          return !option.disabled && index > activeOptionIndex;
        });

        if (this.#isFilterable && nextOption) {
          // Prevent the insertion point from moving to the end of the input field.
          event.preventDefault();
        } else if (!this.#isFilterable) {
          // Prevent page scroll.
          event.preventDefault();
        }

        if (nextOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = nextOption.id;

          nextOption.privateActive = true;
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        ['Home', 'PageUp'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll.

        if (this.#firstEnabledOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateActive = false;
          this.#firstEnabledOption.privateActive = true;

          this.#optionsElement.ariaActivedescendant =
            this.#firstEnabledOption.id;
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        ['End', 'PageDown'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll.

        if (this.#lastEnabledOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateActive = false;
          this.#lastEnabledOption.privateActive = true;

          this.#optionsElement.ariaActivedescendant =
            this.#lastEnabledOption.id;
        }

        return;
      }
    }
  }

  #onTargetSlotChange() {
    if (this.open && !this.isTargetDisabled) {
      this.#show();
    } else {
      this.#hide();
    }

    const observer = new MutationObserver(() => {
      if (this.open && !this.isTargetDisabled) {
        this.#show();
      } else {
        this.#hide();
      }
    });

    if (this.#targetElement && this.#optionsElement) {
      observer.observe(this.#targetElement, {
        attributeFilter: ['aria-disabled', 'disabled'],
      });

      this.#targetElement.id = this.#targetElement.id || uniqueId();
      this.#optionsElement.ariaLabelledby = this.#targetElement.id;
      this.#targetElement.ariaHasPopup = 'true';

      this.#targetElement.setAttribute(
        'aria-controls',
        this.#optionsElement.id,
      );

      if (this.#isTargetSpanOrDivOrSvg) {
        // We want consumers to always use a `<button>` as Menu's target. But we've
        // found that's not always the case. So for their convenience and to ensure
        // accessibility we ensure it's set up correctly.
        this.#targetElement.role = 'button';
        this.#targetElement.tabIndex = 0;
      }
    }
  }

  #onTargetSlotClick(event: Event) {
    // TODO: why wait a tick? so consumers can listen for the event on menu on cancel it to stop
    // menu from closing
    // TODO: etst
    setTimeout(() => {
      const isTargetDisabledSubmenuOption =
        event.target instanceof Element &&
        event.target.closest('glide-core-option')?.disabled;

      // The `event.defaultPrevented` condition because consumers can cancel the event
      // to prevent Menu from opening. Select cancels the event as well.
      //
      // TODO: explain submenu condition
      if (
        event.defaultPrevented ||
        isTargetDisabledSubmenuOption ||
        this.isTargetDisabled
      ) {
        return;
      }

      // If Menu is filterable, Menu doesn't close on click because the user may have clicked
      // the input field to select or change its text.
      if (
        this.#optionElements &&
        this.#optionElements.length > 0 &&
        this.#isFilterable
      ) {
        this.open = true;
      } else if (this.#optionElements && this.#optionElements.length > 0) {
        this.open = !this.open;
      }
    });
  }

  #onTargetSlotMouseUp() {
    this.#isTargetSlotMouseUp = true;
  }

  #show() {
    this.#cleanUpFloatingUi?.();

    if (
      this.#previouslyActiveOption &&
      !this.#previouslyActiveOption.disabled &&
      this.#optionsElement
    ) {
      this.#previouslyActiveOption.privateActive = true;

      this.#optionsElement.ariaActivedescendant =
        this.#previouslyActiveOption.id;
    } else if (this.#firstEnabledOption && this.#optionsElement) {
      this.#firstEnabledOption.privateActive = true;
      this.#previouslyActiveOption = this.#firstEnabledOption;
      this.#optionsElement.ariaActivedescendant = this.#firstEnabledOption.id;
    } else if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    if (this.#targetElement && this.#defaultSlotElementRef.value) {
      this.#cleanUpFloatingUi = autoUpdate(
        this.#targetElement,
        this.#defaultSlotElementRef.value,
        () => {
          (async () => {
            if (this.#targetElement && this.#defaultSlotElementRef.value) {
              const { x, y, placement } = await computePosition(
                this.#targetElement,
                this.#defaultSlotElementRef.value,
                {
                  placement: this.placement,
                  middleware: [offset(this.offset), flip()],
                },
              );

              this.#defaultSlotElementRef.value.dataset.placement = placement;

              Object.assign(this.#defaultSlotElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });
            }

            this.#defaultSlotElementRef.value?.showPopover();

            if (this.#optionsElement && this.#activeOption?.id) {
              this.#optionsElement.ariaActivedescendant = this.#activeOption.id;
            }

            if (this.#targetElement) {
              this.#targetElement.ariaExpanded = 'true';
            }
          })();
        },
      );
    }
  }
}
