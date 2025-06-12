import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
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
 * @slot {Element} [target] - The element to which Menu will anchor. Can be any focusable element.
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

  // Used in `#show()` to open the active option's tooltip when Menu is opened via
  // keyboard. Unlike mouse users, strict keyboard users can't hover an option to
  // reveal its tooltip. So we always open the tooltip for them when an option
  // becomes active.
  //
  // A property instead of a private field because `#onSlotKeydown()` additionally
  // uses this field to signal to submenus that they've been opened via keyboard.
  @property({ type: Boolean })
  privateOpenedViaKeyboard = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    // Guarding against `this.#isSubmenu` isn't strictly necessary. It's nonetheless
    // guarded against to prevent subtle bugs being introduced later. It's hard to say
    // what those bugs would be. But given the complexity of event handling throughout,
    // it seems prudent to only handle document clicks for the top-level menu.
    //
    // Additionally, not handling document clicks for submenus makes things overall easier
    // to understand. As a bonus, we use slightly less memory.
    if (!this.#isSubmenu) {
      // 1. The consumer has a "click" handler on an element that isn't Menu's target.
      // 2. The user clicks taht element.
      // 3. The handler is called. It sets `this.open` to `true`.
      // 4. The "click" bubbles up and is handled by `#onDocumentClick()`.
      // 5. The latter handler sets `open` to `false` because the click came from outside Menu.
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
            // We have to close all but one submenu so they don't overlap, and because it
            // wouldn't be clear to us or the user which open submenu keyboard interactions
            // should affect.
            //
            // Keeping either the first or the last open submenu open is reasonable. So we
            // arbitrarily keep the first one open.
            submenu.open = false;
          }
        }
      }
    } else if (!this.open || this.isTargetDisabled) {
      for (const submenu of this.#submenus) {
        if (submenu.open) {
          // We have to do something if one or more submenus are initially open and the top-
          // level menu is not.
          //
          // We certainly have to close all but one of them so they don't overlap, and because
          // it wouldn't be clear to us or the user which open submenu keyboard interactions
          // should affect. Additionally, which one should we keep open?
          //
          // And what if we keep one open but the top-level menu isn't initially open? Then,
          // when the top-level menu is opened, it'll appear on top of the submenu because
          // the top-level menu was opened second.
          //
          // So we'd have to toggle the submenu's `open` property. But the then submenu would
          // dispatch "toggle" events, sending a false signal to consumers that the user closed
          // then reopened the submenu.
          //
          // Alternatively, we could rename `#show()` and `#hide()` to `privateShow()` and
          // `privateHide()`, and the top-level menu could call those methods to avoid triggering
          // "toggle" events.
          //
          // Then again, what is the use case for having a submenu open when the top-level menu
          // isn't open? It's possible one exists. However, until such a case presents itself,
          // closing every initially submenu when the top-level menu isn't open is the simplest
          // approach.
          //
          // `this.#submenus` is an array of only the current menu's submenus. So you may wonder
          // how submenus of those submenus get closed. They're closed via `#hide()`, which necessarily
          // closes submenus when their supermenu is hidden.
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
        @focusin=${this.#onComponentFocusIn}
        @focusout=${this.#onComponentFocusOut}
        ${ref(this.#componentElementRef)}
      >
        <slot
          class="target-slot"
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onTargetAndDefaultSlotKeyDown}
          @mouseup=${this.#onTargetSlotMouseUp}
          @input=${this.#onTargetSlotInput}
          @slotchange=${this.#onTargetSlotChange}
          ${assertSlot([Element])}
          ${ref(this.#targetSlotElementRef)}
        >
          <!--
            The element to which Menu will anchor. Can be any focusable element.
            @type {Element}
          -->
        </slot>

        <slot
          class="default-slot"
          @click=${this.#onDefaultSlotClick}
          @keydown=${this.#onTargetAndDefaultSlotKeyDown}
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

  // Set in `#onComponentFocusIn()` and `#onComponentFocusOut()`. Used in `#onComponentFocusOut()`
  // to decide if Menu should close. Also used in `#onSlotKeyDown()` to decide if we need
  // to move focus.
  #hasVoiceOverMovedFocusToAnOptionOrOptions = false;

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

  // Set in `#onTargetSlotMouseUp()` and `#onDocumentClick()`. Used in `#onDocumentClick()`:
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
    return Boolean(this.closest('glide-core-option'));
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
    // If we're dealing with a slot, then the consumer of this component has placed a
    // slot inside Options, in which case we need to get its assigned elements. Note
    // that more than one nested slot isn't handled.
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

  get #parentOption() {
    return this.closest('glide-core-option');
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
  #onDocumentClick = (event: MouseEvent) => {
    if (this.#isDefaultSlotClick) {
      this.#isDefaultSlotClick = false;

      return;
    }

    if (this.#isTargetSlotMouseUp) {
      // Set to `false` here instead of in `#onTargetSlotClick()` because it's not guaranteed
      // that the user will mouse up on the target after mousing down on it. The user could
      // move his mouse and then mouse up on something else. Then we'd have bad state.
      this.#isTargetSlotMouseUp = false;

      return;
    }

    // TODO: explain. clicks from space and enter dont have mousedown.
    if (event.detail === 0) {
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

  // Private because consumers haver direct access to the target and can focus it
  // without the support of Menu.
  #focus(options?: FocusOptions) {
    if (this.#targetElement && 'focus' in this.#targetElement) {
      this.#targetElement?.focus(options);
    }
  }

  #hide() {
    this.#cleanUpFloatingUi?.();
    this.#defaultSlotElementRef.value?.hidePopover();

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    if (this.#isSubmenu && this.#parentOption) {
      this.#parentOption.ariaExpanded = 'false';
    } else if (!this.#isSubmenu && this.#targetElement && !this.#isFilterable) {
      this.#targetElement.ariaExpanded = 'false';
    }

    if (this.#activeOption) {
      this.#previouslyActiveOption = this.#activeOption;
      this.#activeOption.privateTooltipOpen = false;
      this.#activeOption.privateActive = false;
    }

    for (const submenu of this.#submenus) {
      submenu.open = false;
    }
  }

  #onComponentFocusIn(event: Event) {
    this.#hasVoiceOverMovedFocusToAnOptionOrOptions =
      event.target instanceof Option || event.target instanceof Options;

    const isFromSubmenu =
      event.target instanceof Element &&
      event.target.closest('glide-core-menu') !== this;

    // VoiceOver again. If VoiceOver focused an option, we make it active so it's
    // displayed as such and so the correct option is selected on Enter or Space.
    if (
      event.target instanceof Option &&
      this.#activeOption &&
      this.#optionsElement &&
      !isFromSubmenu
    ) {
      this.#activeOption.privateActive = false;
      this.#optionsElement.ariaActivedescendant = event.target.id;

      event.target.privateActive = true;
    }
  }

  #onComponentFocusOut(event: FocusEvent) {
    const isTargetFocused =
      event.relatedTarget instanceof Element &&
      this.contains(event.relatedTarget);

    this.#hasVoiceOverMovedFocusToAnOptionOrOptions =
      event.target instanceof Option || event.target instanceof Options;

    if (!isTargetFocused && !this.#hasVoiceOverMovedFocusToAnOptionOrOptions) {
      this.open = false;
    }
  }

  #onDefaultSlotClick(event: Event) {
    // When the padding or border on the default slot of a submenu is clicked,
    // the event will be retargeted by the browser to the submenu's parent option.
    //
    // The event will then get picked by this handler, the supermenu, and Menu
    // will close because `event.target` will be an instance of option.
    //
    // Stopping propagation of the event at the submenu prevents it from being
    // handled by the supermenu. So Menu stays open.
    if (this.#isSubmenu && event.target === this.#defaultSlotElementRef.value) {
      event.stopPropagation();
    }

    // The timeout gives consumers a chance to cancel the event.
    setTimeout(() => {
      if (
        !event.defaultPrevented &&
        // Checked because clicks can come from the default slot's padding as well as
        // submenu targets.
        //
        // When the default slot's padding is clicked, Menu should say open because the
        // user most likely meant to click an option but missed.
        //
        // When a submenu target is clicked, the submenu should be toggled open or closed
        // and its supermenu should remain open.
        event.target instanceof Option
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

  #onDefaultSlotMouseDown(event: Event) {
    // So clicking an option doesn't move focus to `document.body`. Imagine a case
    // where the user opens Menu by clicking its target then clicks an option. The
    // user should be able immediately to press Space or Enter afterward to reopen
    // Menu. It's not uncommon users to change modalities when interacting with
    // something.
    event.preventDefault();
  }

  #onDefaultSlotMouseOver(event: MouseEvent) {
    // Chrome has this funky Popover API bug where the popover is, for about 10 milliseconds,
    // rendered above where it's supposed to be whenever `showPopover()` is called.
    //
    // It's not clear if the popover is invisible during that time or simply that 10
    // milliseconds isn't enough to be noticable. Either way, it's effectively invisible and
    // still picks up "mouseover" events.
    //
    // So, when Menu is opened, if the user's mouse happens to be over one of the option's
    // that inside our invisible popover, then the option is activated. Thus this variable
    // and the guard below.
    //
    // There's no mention of the above issue. But this bug is probably a good one to keep an eye
    // on: https://issues.chromium.org/issues/364669918.
    const isOutOfBounds =
      this.#componentElementRef.value &&
      event.y < this.#componentElementRef.value.getBoundingClientRect().y;

    if (!isOutOfBounds) {
      const option =
        event.target instanceof Element &&
        event.target.closest('glide-core-option');

      const isSubMenuTarget =
        event.target instanceof Element &&
        event.target.closest('[slot="target"]');

      const isOwnOption = option && this.#optionElements?.includes(option);

      // This handler is also called when a submenu option is hovered. If that's the case,
      // we don't want to deactivate the currently active option. Thus `isOwnOption`.
      if (isOwnOption && !isSubMenuTarget && !option.disabled) {
        this.#previouslyActiveOption = this.#activeOption;

        if (this.#activeOption) {
          this.#activeOption.privateActive = false;
        }

        option.privateActive = true;

        if (this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant = event.target.id;
        }
      }

      if (this.#isSubmenu) {
        // Allowing the event to propagate from a submenu option to a supermenu option
        // means it would get picked up by the supermenu option's Tooltip "mouseover"
        // handler and open the supermenu's tooltip.
        event.stopPropagation();
      }

      if (isSubMenuTarget && this.#activeOption) {
        // When the cursor is already inside an option and the user mouses to the
        // option's submenu target, the browser will dispatch "mouseout" followed by
        // "mouseover".
        //
        // The option's tooltip will pickup both events and will remain open because
        // the tooltip will be closed then reopened in the same frame. Canceling the
        // event stops the tooltip from reopening.
        event.preventDefault();
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

    if (
      wasActiveOptionRemoved &&
      this.#firstEnabledOption &&
      this.#optionsElement &&
      this.open &&
      !this.isTargetDisabled
    ) {
      this.#firstEnabledOption.privateActive = true;
      this.#optionsElement.ariaActivedescendant = this.#firstEnabledOption.id;
    }

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        const hasSubmenu = Boolean(option.querySelector('[slot="target"]'));

        if (hasSubmenu) {
          option.ariaHasPopup = 'true';
        }
      }
    }
  }

  #onDefaultSlotToggle(event: Event) {
    this.#isSubmenuOpen = this.#submenus.some(({ open }) => open);

    if (event.target instanceof Menu) {
      for (const submenu of this.#submenus) {
        const isOwnSubmenu = this.#submenus.includes(event.target);

        // Menu can have more than one option with a submenu. If this event was a result of
        // a submenu being opened and another submenu is already open, we make sure to close
        // the already open submenu.
        //
        // Nested submenus also dispatch a "toggle" event when they're opened. So we use
        // `isOwnSubmenu` to guard against closing our own open submenu when a nested
        // submenu is opened.
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

  // On both slots because VoiceOver can focus options, causing them to emit "keydown" events.
  #onTargetAndDefaultSlotKeyDown(event: KeyboardEvent) {
    const isOwnTarget = event.target === this.#targetElement;

    const isChildOfOptions =
      event.target instanceof Element &&
      event.target.closest('glide-core-options');

    const isArbitraryContent = !isOwnTarget && !isChildOfOptions;

    if (isArbitraryContent) {
      // Arbitrary interactive content, particularly at the bottom of Menu, isn't a great
      // pattern because the user has to move focus away from Menu's target to interact
      // with the content. Then the user has to tab back to Menu's target to continue
      // interacting with Menu. It's also not great because screenreader users won't know
      // the content exists until they tab past Menu's target. But it's nonetheless a pattern
      // we need to support.
      //
      // If the event originated from the arbitrary content, then it has focus and not Menu's
      // target and the user has signaled to us that his intention isn't to navigate Menu.
      // So we return below.
      //
      // However, the page shouldn't scroll when the content has focus and the user presses
      // one of the keys below. The consumer could very well prevent page scroll himself. But
      // there's a good chance he won't think to. So we handle it for him.
      const isKeyThatScrollsThePage = [
        'ArrowUp',
        'ArrowDown',
        'ArrowRight',
        'ArrowLeft',
        'PageUp',
        'PageDown',
        'Home',
        'End',
      ].includes(event.key);

      if (isKeyThatScrollsThePage) {
        event.preventDefault();
      }

      if (event.key === 'Escape') {
        this.open = false;
        this.#focus();
      }

      return;
    }

    const isOwnOption = this.#optionElements?.some(
      (option) => option === event.target,
    );

    const isOwnOptions =
      this.querySelector(':scope > glide-core-options') === event.target;

    // If all of the below conditions are false, then the event came from a submenu, in
    // which case the state of this menu shouldn't change. So we return.
    //
    // Returning also prevents a loop where the event is redispatched on the submenu then
    // picked up again by its this menu and on and on.
    if (!isOwnTarget && !isOwnOption && !isOwnOptions) {
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

      // The event is dispatched on `this.#openedSubmenu` instead of `#activeOptionSubmenu`
      // because they may not be the same, and `#activeOptionSubmenu` may not even be open.
      // Imagine a situation where Menu has two options ("One", "Two") each with a submenu:
      //
      // 1. User activates "Two" by hovering it.
      // 2. User opens the submenu of "Two".
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
      // 1. When the user presses ArrowRight or ArrowLeft, top-level Menu's target is an
      //    input field, and the active option has submenu. The event is canceled to prevent
      //    the insertion point from moving in addition to the submenu opening or closing.
      //
      // 2. When the user presses ArrowRight or ArrowLeft and Menu's target is not an input
      //    field. The event is canceled to prevent the page from scrolling to the left or right.
      //
      // 3. When the user presses ArrowUp, ArrowDown, PageUp, PageDown, Home, or End. The event
      //    is canceled to prevent page scroll and to prevent the insertion point from moving.
      //
      // The dispatch above is synchronous. The handling of the dispatched event (the logic
      // below this condition) is also synchronous. That means this entire handler will have
      // run again for the submenu the moment the subevent is dispatched above. So the submenu
      // (or nested submenu) will have had a chance to cancel the event by the time we've
      // arrived here. The reason the submenu TODO
      //
      // Canceling the event if its subevent is canceled allows the cancelation to propagate
      // back up to original event: the one dispatched on the top-level Menu's target.
      if (subevent.defaultPrevented) {
        event.preventDefault();
      }

      // This is the one case where both a supermenu and submenu both handle the event. Because
      // its the one case where two things need to happen. The submenu needs to close itself.
      // And the supermenu needs open to the tooltip of its active option.
      //
      // Additionally, note that this logic is after the subevent is dispatched above. That's
      // because `this.#isSubmenuOpen` will be `true` until the submenu has handled the event.
      if (
        ['ArrowLeft', 'Escape'].includes(event.key) &&
        this.#activeOption &&
        !this.#isSubmenuOpen
      ) {
        this.#activeOption.privateTooltipOpen = true;
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
      event.preventDefault(); // Prevent page scroll

      this.privateOpenedViaKeyboard = true;
      this.open = true;
      this.privateOpenedViaKeyboard = false;

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

      this.privateOpenedViaKeyboard = true;
      this.open = true;
      this.privateOpenedViaKeyboard = false;
    }

    if (
      !this.open &&
      ['ArrowUp', 'ArrowDown'].includes(event.key) &&
      this.#optionsElement
    ) {
      // - Prevents page scroll when Menu is not filterable.
      // - Prevents the insertion point from moving when Menu is filterable.
      event.preventDefault();

      this.privateOpenedViaKeyboard = true;
      this.open = true;
      this.privateOpenedViaKeyboard = false;

      return;
    }

    if (this.open && event.key === 'Escape') {
      event.preventDefault(); // Prevent Safari from leaving full screen.

      this.open = false;

      // If VoiceOver has moved focus, the browser will move focus to `document.body` now
      // that Menu is closed. We move focus to either the parent option or the top-level
      // target instead so the VoiceOver user isn't kicked to the top of the page.
      if (this.#hasVoiceOverMovedFocusToAnOptionOrOptions && this.#isSubmenu) {
        this.#parentOption?.focus();
      } else if (this.#hasVoiceOverMovedFocusToAnOptionOrOptions) {
        this.#focus();
      }

      return;
    }

    // Everything below this point only applies when options and submenus are usable.
    // They're not usable when Menu is loading.
    if (this.loading) {
      return;
    }

    if (this.open && event.key === 'ArrowRight' && !event.metaKey) {
      if (this.#activeOptionSubmenu) {
        // If the active option has a submenu, the user expects ArrowRight to open the
        // submenu and not to also move the insertion point.
        event.preventDefault();

        if (this.#activeOption) {
          this.#activeOption.privateTooltipOpen = false;
        }

        this.#activeOptionSubmenu.privateOpenedViaKeyboard = true;
        this.#activeOptionSubmenu.open = true;
        this.#activeOptionSubmenu.privateOpenedViaKeyboard = false;
      } else if (!this.#isFilterable) {
        event.preventDefault(); // Prevent page scroll
      }

      return;
    }

    if (this.open && event.key === 'ArrowLeft' && !event.metaKey) {
      if (this.#isSubmenu) {
        // If we're in a submenu, the user expects ArrowLeft to close the submenu and not
        // to also move the insertion point.
        event.preventDefault();

        if (this.#activeOption) {
          this.#activeOption.privateTooltipOpen = false;
        }

        this.open = false;
      } else if (!this.#isFilterable) {
        event.preventDefault(); // Prevent page scroll
      }

      return;
    }

    if (this.open && event.key === 'Enter') {
      if (!this.#isFilterable) {
        // Enter will produce a "click" event. But so will `#activeOption?.click()` below.
        // Canceling this event simplifies logic elsewhere so we don't have to account for
        // two successive clicks and Menu closing then immediately reopening.
        event.preventDefault();

        // If VoiceOver has moved focus, the browser will move focus to `document.body` when
        // Menu is closed after the active option is clicked below. We move focus to the target
        // instead so the VoiceOver user isn't kicked to the top of the page.
        if (
          this.#hasVoiceOverMovedFocusToAnOptionOrOptions &&
          !this.#isSubmenu
        ) {
          this.#focus();
        }
      }

      // The option is clicked here and elsewhere so the event's `target` is set to the
      // option. That way consumers listening for the "click" event know which option was
      // selected.
      this.#activeOption?.click();

      return;
    }

    // Menu being filterable is guarded against because pressing Space is meant
    // to insert a space and not select an option.
    if (this.open && event.key === ' ' && !this.#isFilterable) {
      event.preventDefault(); // Prevent page scroll

      // If VoiceOver has moved focus, the browser will move focus to `document.body` when
      // Menu is closed after the active option is clicked below. We move focus to the target
      // instead so the VoiceOver user isn't kicked to the top of the page.
      if (this.#hasVoiceOverMovedFocusToAnOptionOrOptions && !this.#isSubmenu) {
        this.#focus();
      }

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
          // Prevent page scroll
          event.preventDefault();
        }

        if (previousOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateTooltipOpen = false;
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = previousOption.id;

          previousOption.privateActive = true;
          previousOption.privateTooltipOpen = true;

          const { scrollX, scrollY } = window;

          previousOption.scrollIntoView({
            block: 'center', // So options before the current one are in view.
          });

          // Scrolling the option into view will scroll both its scrollable container
          // and the window. Scrolling the window so the container is in view can be
          // helpful. But more often than not it's disruptive. So we restore scroll to
          // what it was.
          window.scrollTo(scrollX, scrollY);
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
          // Prevent page scroll
          event.preventDefault();
        }

        if (nextOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateTooltipOpen = false;
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = nextOption.id;

          nextOption.privateActive = true;
          nextOption.privateTooltipOpen = true;

          const { scrollX, scrollY } = window;

          nextOption.scrollIntoView({
            block: 'center', // So options after the current one are in view.
          });

          // Scrolling the option into view will scroll both its scrollable container
          // and the window. Scrolling the window so the container is in view can be
          // helpful. But more often than not it's disruptive. So we restore scroll to
          // what it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        ['Home', 'PageUp'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll

        if (this.#firstEnabledOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateTooltipOpen = false;
          this.#activeOption.privateActive = false;

          this.#optionsElement.ariaActivedescendant =
            this.#firstEnabledOption.id;

          this.#firstEnabledOption.privateActive = true;
          this.#firstEnabledOption.privateTooltipOpen = true;

          const { scrollX, scrollY } = window;

          this.#firstEnabledOption.scrollIntoView();

          // Scrolling the option into view will scroll both its scrollable container
          // and the window. Scrolling the window so the container is in view can be
          // helpful. But more often than not it's disruptive. So we restore scroll to
          // what it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        ['End', 'PageDown'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll

        if (this.#lastEnabledOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateTooltipOpen = false;
          this.#activeOption.privateActive = false;

          this.#optionsElement.ariaActivedescendant =
            this.#lastEnabledOption.id;

          this.#lastEnabledOption.privateActive = true;
          this.#lastEnabledOption.privateTooltipOpen = true;

          // Scrolling the option into view will scroll both its scrollable container
          // and the page. Scrolling the page so the container is in view can be helpful.
          // But more often than not it's disruptive.
          const { scrollX, scrollY } = window;
          this.#lastEnabledOption.scrollIntoView();
          window.scrollTo(scrollX, scrollY);
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

      if (this.#isSubmenu && this.#parentOption) {
        this.#parentOption.ariaHasPopup = 'true';
      } else if (!this.#isSubmenu && this.#targetElement) {
        this.#targetElement.ariaHasPopup = 'true';
      }

      if (this.#isFilterable && !this.#isSubmenu) {
        this.#targetElement.setAttribute(
          'aria-controls',
          this.#optionsElement.id,
        );
      }

      // We want consumers to use a `<button>` or similar as Menu's target. But we've
      // found that's not always the case. So, for their convenience and to ensure
      // accessibility, we make sure the target set up correctly.
      //
      // We guard against submenu targets because there's no need for the user to be
      // able to focus them.
      if (this.#isTargetSpanOrDivOrSvg && !this.#isSubmenu) {
        this.#targetElement.role = 'button';
        this.#targetElement.tabIndex = 0;
      }

      // There's no need for the user to be able to focus a submenu target given the
      // entire component, including submenus, can be interacted with via keyboard
      // without the user moving focus from the top-level target.
      if (
        this.#isSubmenu &&
        this.#targetElement &&
        this.#targetElement.tabIndex === 0
      ) {
        this.#targetElement.tabIndex = -1;
      }
    }
  }

  #onTargetSlotClick(event: PointerEvent) {
    const closestOption =
      event.target instanceof Element &&
      event.target.closest('glide-core-option');

    const isSubmenuTarget =
      event.target instanceof Element && Boolean(closestOption);

    const isClosestOptionALink =
      closestOption instanceof Option &&
      closestOption.href !== undefined &&
      closestOption.role !== 'option';

    const didMenuCancelTheEvent = isSubmenuTarget && isClosestOptionALink;

    if (isSubmenuTarget && isClosestOptionALink) {
      // When an option is a link and has a submenu, clicking the submenu's target
      // shouldn't cause a navigation. So we cancel the event. And we have to cancel it
      // before the timeout to stop navigation.
      event.preventDefault();
    }

    if (isSubmenuTarget) {
      // Submenu target clicks aren't let to propagate because they muddy the waters
      // for consumers. Consumers listen for "click" to know when an option is clicked.
      // And they listen for "toggle" to know when a menu or submenu is opened or closed.
      // So submenu target clicks are just noise.
      event.stopPropagation();
    }

    // The timeout gives consumers a chance to cancel the event.
    setTimeout(() => {
      const isClosestOptionDisabled =
        closestOption instanceof Option && closestOption.disabled;

      const didTheConsumerCancelTheEvent =
        event.defaultPrevented && !didMenuCancelTheEvent;

      if (
        didTheConsumerCancelTheEvent ||
        isClosestOptionDisabled ||
        this.isTargetDisabled
      ) {
        return;
      }

      // It's `0` when the event came from the user pressing Space or Enter. It's also `0`
      // when a developer calls `click()` or dispatches an event progratically. It's not
      // ideal that we show the option's tooltip in those cases. But it should be fine.
      if (event.detail === 0) {
        this.privateOpenedViaKeyboard = true;
      }

      // If Menu is filterable, Menu doesn't close on click because the user may have clicked
      // the input field to select or change its text.
      if (
        this.#optionElements &&
        this.#optionElements.length > 0 &&
        this.#isFilterable &&
        // Only the top-level menu is filterable. All other menu targets are just buttons of one
        // kind or another. So clicking them should close the menu in question.
        !this.#isSubmenu
      ) {
        this.open = true;
      } else if (this.#optionElements && this.#optionElements.length > 0) {
        this.open = !this.open;
      }

      if (event.detail === 0) {
        this.privateOpenedViaKeyboard = false;
      }
    });
  }

  // This handler in addition to the "keydown" one because entering characters into
  // the input field should open Menu. And an "input" handler is an easy way to filter
  // out non-character input.
  #onTargetSlotInput() {
    this.open = true;
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

      this.#previouslyActiveOption.privateTooltipOpen =
        this.privateOpenedViaKeyboard;

      this.#optionsElement.ariaActivedescendant =
        this.#previouslyActiveOption.id;
    } else if (this.#firstEnabledOption && this.#optionsElement) {
      this.#firstEnabledOption.privateActive = true;

      this.#firstEnabledOption.privateTooltipOpen =
        this.privateOpenedViaKeyboard;

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
          if (this.#targetElement && this.#defaultSlotElementRef.value) {
            computePosition(
              this.#targetElement,
              this.#defaultSlotElementRef.value,
              {
                placement: this.placement,
                middleware: [offset(this.offset), flip()],
              },
            ).then(({ x, y, placement }) => {
              if (this.#targetElement && this.#defaultSlotElementRef.value) {
                this.#defaultSlotElementRef.value.dataset.placement = placement;

                Object.assign(this.#defaultSlotElementRef.value.style, {
                  left: `${x}px`,
                  top: `${y}px`,
                });

                if (this.#isSubmenu && this.#parentOption) {
                  this.#parentOption.ariaExpanded = 'true';
                } else if (!this.#isSubmenu && this.#targetElement) {
                  this.#targetElement.ariaExpanded = 'true';
                }

                this.#defaultSlotElementRef.value.showPopover();
              }

              if (this.#optionsElement && this.#activeOption?.id) {
                this.#optionsElement.ariaActivedescendant =
                  this.#activeOption.id;
              }
            });
          }
        },
      );
    }
  }
}
