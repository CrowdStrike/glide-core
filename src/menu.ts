import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import Options from './options.js';
import OptionsGroup from './options.group.js';
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
 * @slot {Element} target - The element to which Menu will anchor. Can be any focusable element unless it's the target of a sub-Menu, in which case the element shouldn't be focusable. If you want Menu to be filterable, put an Input in this slot. Listen for Input's "input" event, then add and remove Option(s) from Menu's default slot based on Input's value.
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

  // Used in `#show()` to open the active Option's tooltip when Menu is opened via
  // keyboard. Unlike mouse users, keyboard users can't hover an Option to reveal
  // its tooltip. So we always open the tooltip for them when an Option becomes
  // active.
  //
  // A property instead of a private field because `#onTargetAndDefaultSlotKeyDown()`
  // additionally uses this field to signal to sub-Menus that they've been opened
  // via keyboard.
  @property({ type: Boolean })
  privateOpenedViaKeyboard = false;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    // Guarding against `#isSubMenu` isn't strictly necessary. We guard against it
    // nonetheless to prevent subtle bugs being introduced later. It's hard to say what
    // those bugs would be. But given the complexity of event handling throughout, it
    // seems prudent to only handle document clicks only where we need to: the
    // top-level Menu.
    //
    // Additionally, not handling document clicks for sub-Menus makes things overall
    // easier to understand because developers don't have to think about sub-Menus when
    // looking at `#onDocumentClick()`.
    if (!this.#isSubMenu) {
      document.addEventListener('click', this.#onDocumentClick);
    }
  }

  override createRenderRoot() {
    this.#shadowRoot = super.createRenderRoot() as ShadowRoot;
    return this.#shadowRoot;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    document.removeEventListener('click', this.#onDocumentClick);
  }

  override firstUpdated() {
    if (this.#optionsElement && this.#targetElement) {
      this.#optionsElement.privateLoading = this.loading;

      this.#targetElement.ariaDescription = this.loading
        ? this.#localize.term('loading')
        : null;
    }

    if (this.open && !this.isTargetDisabled) {
      const openedSubMenus = this.#subMenus.filter(({ open }) => open);

      if (openedSubMenus.length > 1) {
        for (const [index, subMenu] of openedSubMenus.entries()) {
          if (index !== 0) {
            // We have to close all but one sub-Menu so they don't overlap. And because it
            // wouldn't be clear to us or the user which open sub-Menu keyboard interactions
            // should manipulate.
            //
            // Keeping either the first or the last open sub-Menu open is reasonable. So we
            // arbitrarily keep the first one open.
            subMenu.open = false;
          }
        }
      }
    } else if (!this.open || this.isTargetDisabled) {
      for (const subMenu of this.#subMenus) {
        if (subMenu.open) {
          // We have to do something if one or more sub-Menus are initially open and the top-
          // level Menu isn't open or its target is disabled.
          //
          // What if we keep a sub-Menu and the top-level Menu isn't initially open? Then,
          // when the top-level Menu is opened, it'll appear on top of the sub-Menu because
          // the top-level Menu was opened second. So we'd have to toggle the sub-Menu
          // closed then open.
          //
          // But what is the use case for having a sub-Menu open when the top-level Menu
          // isn't open? It's possible one exists. Until a case presents itself, however,
          // closing every initially sub-Menu when the top-level Menu isn't open is the
          // simplest approach.
          //
          // `#subMenus` is an array of only the current Menu's sub-Menus. So you may wonder
          // how nested sub-Menus get closed. They're closed via their `#hide()`, which
          // necessarily closes a Menu's sub-Menus when the Menu is hidden.
          subMenu.open = false;
        }
      }
    }

    if (this.#defaultSlotElementRef.value) {
      // `popover` so Options can break out of Modal or another container that has
      // `overflow: hidden`. Elements with `popover` are positioned relative to the
      // viewport. Thus Floating UI in addition to `popover` until anchor positioning is
      // well supported.
      //
      // "manual" is set here instead of in the template to circumvent Lit Analyzer,
      // which isn't aware of `popover` and doesn't provide a way to disable its
      // "no-unknown-attribute" rule.
      //
      // "manual" instead of "auto" because the latter only allows one popover to be open
      // at a time. And consumers may have other popovers that need to remain open while
      // this popover is open.
      //
      // "auto" also automatically opens the popover when its target is clicked. We want
      // it to remain closed when clicked when there are no Options or Menu's target is
      // disabled.
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
    // The linter wants a "focus" handler on the default slot. And the "focusin" below
    // doesn't satisfy it.
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
          @input=${this.#onTargetSlotInput}
          @slotchange=${this.#onTargetSlotChange}
          ${assertSlot([Element])}
          ${ref(this.#targetSlotElementRef)}
        >
          <!--
            The element to which Menu will anchor. Can be any focusable element unless it's
            the target of a sub-Menu, in which case the element shouldn't be focusable.

            If you want Menu to be filterable, put an Input in this slot. Listen for Input's
            "input" event, then add and remove Option(s) from Menu's default slot based on
            Input's value.

            @required
            @type {Element}
          -->
        </slot>

        <slot
          class="default-slot"
          data-test="default-slot"
          @click=${this.#onDefaultSlotClick}
          @keydown=${this.#onTargetAndDefaultSlotKeyDown}
          @mousedown=${this.#onDefaultSlotMouseDown}
          @mouseover=${this.#onDefaultSlotMouseOver}
          @private-disabled-change=${this.#onDefaultSlotDisabledChange}
          @private-slot-change=${this.#onDefaultSlotSlotChange}
          @toggle=${this.#onDefaultSlotToggle}
          ${assertSlot([Element])}
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

  // Set in `#onComponentFocusIn()` and `#onComponentFocusOut()`. Used in
  // `#onComponentFocusOut()` to decide if Menu should close. Also used in
  // `#onTargetAndDefaultSlotKeyDown()` to decide if we need to move focus.
  #hasVoiceOverMovedFocusToOptionsOrAnOption = false;

  // Set in `#onDefaultSlotMouseUp()`. Used in `#onDocumentClick()` to guard against
  // Menu closing when any number of things that are not an Option are clicked. Those
  // "click" events will be retargeted to Menu's host the moment they bubble out of
  // Menu. So checking in `#onDocumentClick()` if the click's `event.target` came
  // from inside Menu won't do.
  #isDefaultSlotClick = false;

  #isLoading = false;

  #isOpen = false;

  // Set in `#onDefaultSlotToggle()`. Used in `#onTargetAndDefaultSlotKeyDown()` to
  // guard against redispatching the event to a sub-Menu when one isn't open. Also
  // used in `connectedCallback()` to guard against listening for document clicks for
  // sub-Menus.
  #isSubMenuOpen = false;

  // Similar situation as with `isDefaultSlotClick`. Set in `#onTargetSlotClick()`
  // and `#onDocumentClick()`. Used in `#onDocumentClick()`:
  //
  // 1. Menu is open.
  // 2. User clicks Menu's target.
  // 3. `#onDocumentClick()` sets `open` to `false`.
  // 4. `#onTargetSlotClick()` sets `open` to true`.
  // 5. Menu never closes.
  //
  // Setting `#isTargetSlotClick` to `true` in `#onTargetSlotClick()` gives
  // `#onDocumentClick()` the information it needs to not set `open` to `false`.
  #isTargetSlotClick = false;

  #localize = new LocalizeController(this);

  #offset: number | undefined;

  // Used in various situations to reactivate the previously active Option.
  #previouslyActiveOption?: Option | null;

  #shadowRoot?: ShadowRoot;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  get #activeOption() {
    return this.#optionElements?.find(({ privateActive }) => privateActive);
  }

  get #activeOptionSubMenu() {
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

  get #isSubMenu() {
    return Boolean(this.closest('glide-core-option'));
  }

  get #isTargetSpanOrDivOrSvg() {
    return (
      this.#targetElement instanceof HTMLSpanElement ||
      this.#targetElement instanceof HTMLDivElement ||
      this.#targetElement instanceof SVGElement
    );
  }

  get #openedSubMenu() {
    return this.#subMenus.find(({ open }) => open);
  }

  get #optionsElement() {
    return this.#defaultSlotElementRef.value
      ?.assignedElements({ flatten: true })
      ?.find((element): element is Options => element instanceof Options);
  }

  get #optionElements() {
    // If we're dealing with a slot, then the consumer of Menu has placed a slot inside
    // Options, in which case we need to get its assigned elements.
    if (this.#optionsElement) {
      return [...this.#optionsElement.children]
        .flatMap((element) => {
          return element instanceof HTMLSlotElement
            ? element.assignedElements({ flatten: true })
            : element instanceof OptionsGroup
              ? [...element.children]
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

  get #subMenus() {
    return [
      ...this.querySelectorAll<Menu>(
        // The "content" slot case.
        ':scope > glide-core-options > glide-core-option > [slot="content"] > glide-core-menu',
      ),
      ...this.querySelectorAll<Menu>(
        // The "content" slot and Options Group case.
        ':scope > glide-core-options > glide-core-options-group > glide-core-option > [slot="content"] > glide-core-menu',
      ),
      ...this.querySelectorAll<Menu>(
        // The "content" slot fallback case.
        ':scope > glide-core-options > glide-core-option > [slot="submenu"]',
      ),
      ...this.querySelectorAll<Menu>(
        // The "content" slot fallback and Options Group case.
        ':scope > glide-core-options > glide-core-options-group > glide-core-option > [slot="submenu"]',
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

  // An arrow function field instead of a method so `this` is closed over and set to
  // the component instead of `document`.
  #onDocumentClick = () => {
    if (this.#isDefaultSlotClick) {
      this.#isDefaultSlotClick = false;

      return;
    }

    if (this.#isTargetSlotClick) {
      this.#isTargetSlotClick = false;

      return;
    }

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    for (const subMenu of this.#subMenus) {
      subMenu.open = false;
    }

    this.open = false;
  };

  // Private because consumers haver direct access to the target and can focus it
  // without the help of Menu.
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

    if (this.#isSubMenu && this.#parentOption) {
      this.#parentOption.ariaExpanded = 'false';
    } else if (!this.#isSubMenu && this.#targetElement && !this.#isFilterable) {
      this.#targetElement.ariaExpanded = 'false';
    }

    if (this.#activeOption) {
      this.#previouslyActiveOption = this.#activeOption;
      this.#activeOption.privateTooltipOpen = false;
      this.#activeOption.privateActive = false;
    }

    for (const subMenu of this.#subMenus) {
      subMenu.open = false;
    }
  }

  #onComponentFocusIn(event: Event) {
    this.#hasVoiceOverMovedFocusToOptionsOrAnOption =
      event.target instanceof Option || event.target instanceof Options;

    const isFromSubMenu =
      event.target instanceof Element &&
      event.target.closest('glide-core-menu') !== this;

    // VoiceOver again. If VoiceOver has focused an Option, we make it active so it's
    // displayed as such and so the correct Option is selected on Enter or Space in
    // `#onTargetAndDefaultSlotKeyDown()`.
    if (
      event.target instanceof Option &&
      this.#activeOption &&
      this.#optionsElement &&
      !isFromSubMenu
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

    this.#hasVoiceOverMovedFocusToOptionsOrAnOption =
      event.target instanceof Option || event.target instanceof Options;

    if (!isTargetFocused && !this.#hasVoiceOverMovedFocusToOptionsOrAnOption) {
      this.open = false;
    }
  }

  #onDefaultSlotClick(event: Event) {
    this.#isDefaultSlotClick = true;

    // When the padding or border on the default slot of a sub-Menu is clicked, the
    // event will be retargeted by the browser to the sub-Menu's parent Option.
    //
    // The event will then get picked by this handler in the super-Menu, and the
    // super-Menu will close because `event.target` will be an Option.
    //
    // Stopping propagation of the event at the sub-Menu prevents the event from being
    // handled by the super-Menu, and the super-Menu stays open.
    if (this.#isSubMenu && event.target === this.#defaultSlotElementRef.value) {
      event.stopPropagation();
    }

    // When Menu is in the shadow DOM of another component, `event.target` will be
    // retargeted to the host of that component the moment the event bubbles out of
    // it.
    //
    // So, when the timeout callback below is called, `event.target` will have been
    // retargeted and the `instanceof` check will wrongly fail when an Option is
    // clicked, and Menu will never close. So we store a reference to the original
    // `event.target` and use it in the `instanceof` condition.
    const originalEventTarget = event.target;

    // The timeout gives consumers a chance to cancel the event to prevent Menu from
    // closing.
    setTimeout(() => {
      // `event.target instanceof Option` because clicks can come from sub-Menu targets,
      // arbitrary content in the default slot, and the default slot's border and
      // padding.
      //
      // When arbitrary content in the default slot is clicked, Menu should remain open
      // because we don't know what the arbitrary content is. So inaction is best.
      // Consumers can listen for clicks on the arbitrary content and close Menu
      // themselves if they need to.
      //
      // When the default slot's padding is clicked, Menu should remain open because the
      // user most likely meant to click an Option but missed.
      if (!event.defaultPrevented && originalEventTarget instanceof Option) {
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
    // So that clicking an Option doesn't move focus to `document.body`.
    //
    // Imagine a case where the user opens Menu by clicking its target, then clicks an
    // Option. The user should be able to immediately press Space or Enter afterward
    // to reopen Menu. This might seem like an odd case to support. But, in practice,
    // it's not uncommon for users to change modalities when interacting with
    // something.
    event.preventDefault();
  }

  #onDefaultSlotMouseOver(event: MouseEvent) {
    // Chrome has this funky Popover API bug where the popover is, for about 10
    // milliseconds, rendered above where it's supposed to be whenever `showPopover()`
    // is called.
    //
    // It's not clear if the popover is invisible during that time, or if it's visible
    // and 10 milliseconds isn't enough to be noticable. Either way, it's effectively
    // invisible but still picks up "mouseover" events.
    //
    // If the user's mouse happens to be over one of the Option(s) that's inside our
    // invisible, mispositioned popover, then the Option is activated. Thus this
    // variable and the guard below it.
    //
    // There's no mention of the above issue in it. But this bug is probably a good one
    // to keep an eye on: https://issues.chromium.org/issues/364669918.
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

      // This handler is also called when a sub-Menu Option is hovered because sub-Menu
      // Option(s) are children of their super-Menu's default slot. And hovering a
      // sub-Menu Option shouldn't deactivate the super-Menu's active Option. Thus
      // `isOwnOption`.
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

      if (this.#isSubMenu) {
        // Allowing the event to propagate from a sub-Menu's parent Option means it would
        // get picked up by the super-Menu Option's Tooltip "mouseover" handler. Then it
        // would open the super-Menu's tooltip.
        event.stopPropagation();
      }

      if (isSubMenuTarget && this.#activeOption) {
        // When the cursor is already inside an Option and the user mouses to the Option's
        // sub-Menu target, the browser will dispatch "mouseout" followed by "mouseover".
        //
        // The Option's tooltip will pick up both events and will remain open because the
        // tooltip will be closed then immediately reopened. But we want the tooltip to
        // close when a sub-Menu target is hovered. Canceling the event stops the tooltip
        // from reopening.
        event.preventDefault();
      }
    }
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
        const hasSubMenu = Boolean(option.querySelector('[slot="target"]'));

        if (hasSubMenu) {
          option.ariaHasPopup = 'true';
        }
      }
    }
  }

  #onDefaultSlotToggle(event: Event) {
    this.#isSubMenuOpen = this.#subMenus.some(({ open }) => open);

    if (event.target instanceof Menu) {
      for (const subMenu of this.#subMenus) {
        const isOwnSubMenu = this.#subMenus.includes(event.target);

        // Menu can have more than one Option with a sub-Menu. If the event was a result
        // of a sub-Menu being opened and another sub-Menu is already open, we make sure
        // to close the already open sub-Menu.
        //
        // Nested sub-Menus also dispatch "toggle" events when they're opened. So we use
        // `isOwnSubMenu` to guard against closing our own open sub-Menu when a nested
        // sub-Menu is opened.
        if (
          isOwnSubMenu &&
          subMenu !== event.target &&
          subMenu.open &&
          event.target.open
        ) {
          subMenu.open = false;
        }
      }
    }
  }

  // On both slots because VoiceOver can focus Options, causing them to emit
  // "keydown" events.
  #onTargetAndDefaultSlotKeyDown(event: KeyboardEvent) {
    const isOwnTarget = event.target === this.#targetElement;

    const isChildOfOptions =
      event.target instanceof Element &&
      event.target.closest('glide-core-options');

    const isArbitraryContent = !isOwnTarget && !isChildOfOptions;

    if (isArbitraryContent) {
      // Arbitrary interactive content, either at the top or bottom of Menu, isn't a
      // great pattern because the user has to move focus away from Menu's target to
      // interact with the content. Then the user has to tab back to Menu's target to
      // continue interacting with Menu. It's also not great because screenreader users
      // won't know the content exists until they tab past Menu's target. Still, it's a
      // pattern we have to support.
      //
      // If the event originated from arbitrary content, then the arbitrary content has
      // focus and not Menu's target, and the user has signaled that his intention isn't
      // to interact with Menu itself. So we return.
      //
      // Still, the page shouldn't scroll when the arbitrary content has focus and the
      // user presses one of the following keys. The consumer could very well prevent
      // page scroll himself. But there's a good chance he won't think to. So we do so
      // for him.
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

    // The event came from a sub-Menu if all the below conditions are met, in which
    // case the state of this Menu shouldn't change. So we return.
    //
    // Returning also prevents a loop where the event is redispatched on the sub-Menu
    // then picked up again by its super-Menu and on and on.
    if (!isOwnTarget && !isOwnOption && !isOwnOptions) {
      return;
    }

    if (this.#isSubMenuOpen) {
      const subevent = new KeyboardEvent(event.type, {
        bubbles: true,
        cancelable: true,
        key: event.key,
        metaKey: event.metaKey,
        shiftKey: event.shiftKey,
      });

      // The event is dispatched on `#openedSubMenu` instead of `#activeOptionSubMenu`
      // because they may not be the same. And `#activeOptionSubMenu` may not even be
      // open.
      //
      // Imagine a situation where Menu has two Options ("One", "Two") each with a
      // sub-Menu:
      //
      // 1. User activates "Two" by hovering it.
      // 2. User opens the sub-Menu of "Two".
      // 3. User activates "One" by hovering it.
      // 4. User presses ArrowUp or ArrowDown.
      //
      // `#activeOptionSubMenu` would be "One". But "One" isn't open and isn't the
      // sub-Menu the user wants to interact with.

      // Normally this rule makes sense. But here we're not dispatching an event for
      // consumers. We're simply redispatching an event. So the event doesn't belong in
      // the JSDoc comment.
      //
      // eslint-disable-next-line @crowdstrike/glide-core/event-dispatch-from-this
      this.#openedSubMenu
        ?.querySelector('[slot="target"]')
        ?.dispatchEvent(subevent);

      // The event is canceled in a couple situations:
      //
      // 1. When the user presses ArrowRight or ArrowLeft, the top-level Menu's target is
      //    an Input, and the active Option has sub-Menu. The event is canceled to prevent
      //    the insertion point from moving in addition to the sub-Menu opening or closing.
      //
      // 2. When the user presses ArrowUp, the top-level Menu's target is an Input, and
      //    an Option that's not the first Option is active. The event is canceled to
      //    prevent the insertion point from moving in addition to the previous Option
      //    being made active. Similar for Home.
      //
      // 3. When the user presses ArrowDown, the top-level Menu's target is an Input, and
      //    an Option that's not the last Option is active. The event is canceled to prevent
      //    the insertion point from moving in addition to the next Option being made
      //    active. Similar for End.
      //
      // 4. When the user presses ArrowRight, ArrowLeft, ArrowUp, ArrowDown, PageUp,
      //    PageDown, Home, or End and Menu's target is not an Input. The event is canceled
      //    to prevent the page from scrolling.
      //
      // The dispatch above is synchronous. The handling of the dispatched event is also
      // synchronous. That means this entire handler will have run for the sub-Menu by
      // the time we've arrived here. So the sub-Menu (or nested sub-Menu) will have had
      // a chance to cancel the event.
      //
      // Below, the super-Menu checks if the event that was dispatched on its sub-Menu
      // was canceled and, if so, cancels its own event. This happens all the way up to
      // the top-level Menu, which then cancels its event to prevent the page from
      // scrolling or the insertion point from moving.
      //
      // Why can't the top-level Menu simply cancel its own event right away in one of
      // the situations above? Because Menu, rightly, has limited knowledge of sub-Menus.
      // It only knows that one of its own Option(s) has a sub-Menu and so dispatches the
      // event to its sub-Menu.
      //
      // Imagine:
      //
      // 1. Menu is filterable.
      // 2. Menu has a sub-Menu that is open.
      // 3. The sub-Menu's active Option also has a sub-Menu.
      // 4. The user presses ArrowRight to open that Option's sub-Menu.
      //
      // The top-level Menu only knows the state of its own Option(s). It doesn't know
      // which sub-Menu Option is active or if the sub-Menu Option has itself a sub-Menu.
      // So it doesn't know if it should cancel the event to prevent the insertion point
      // from moving. Instead sub-Menus communicate to the top-level Menu, by a cascade
      // of event cancelations, that its own event should be canceled.
      //
      // While convoluted to explain in writing, this approach is quite simple in
      // practice, and it preserves boundaries between a Menu and its sub-Menus.
      if (subevent.defaultPrevented) {
        event.preventDefault();
      }

      // This is the one case where both a super-Menu and sub-Menu both handle an event
      // because it's the one case where two things need to happen. The sub-Menu needs to
      // close itself. And the super-Menu needs to open the tooltip of its active Option.
      //
      // Note that this logic comes after the event dispatch above. That's because
      // `#isSubMenuOpen` will be `true` until the sub-Menu has handled the event and
      // closed itself.
      if (
        ['ArrowLeft', 'Escape'].includes(event.key) &&
        this.#activeOption &&
        !this.#isSubMenuOpen
      ) {
        this.#activeOption.privateTooltipOpen = true;
      }

      return;
    }

    // SPANs, DIVs, and SVGs don't emit "click" events on Enter or Space. If they did,
    // Menu would be opened by `#onTargetSlotClick()` and we wouldn't have to open it
    // here.
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
      // So we have to open Menu here.
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
      // that Menu is closed. We move focus to either the parent Option or the top-level
      // target instead so the VoiceOver user isn't kicked back to the top of the page.
      if (this.#hasVoiceOverMovedFocusToOptionsOrAnOption && this.#isSubMenu) {
        this.#parentOption?.focus();
      } else if (this.#hasVoiceOverMovedFocusToOptionsOrAnOption) {
        this.#focus();
      }

      return;
    }

    // Everything below this point only applies when Option(s) and sub-Menus are
    // usable. And they're not usable when Menu is loading.
    if (this.loading) {
      return;
    }

    if (this.open && event.key === 'ArrowRight' && !event.metaKey) {
      if (this.#activeOptionSubMenu) {
        // If the active Option has a sub-Menu, the user expects ArrowRight to open the
        // sub-Menu and not to also move the insertion point.
        event.preventDefault();

        if (this.#activeOption) {
          this.#activeOption.privateTooltipOpen = false;
        }

        this.#activeOptionSubMenu.privateOpenedViaKeyboard = true;
        this.#activeOptionSubMenu.open = true;
        this.#activeOptionSubMenu.privateOpenedViaKeyboard = false;
      } else if (!this.#isFilterable) {
        event.preventDefault(); // Prevent page scroll
      }

      return;
    }

    if (this.open && event.key === 'ArrowLeft' && !event.metaKey) {
      if (this.#isSubMenu) {
        // If we're in a sub-Menu, the user expects ArrowLeft to close the sub-Menu and not
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

        // If VoiceOver has moved focus, the browser will move focus to `document.body`
        // when Menu is closed after the active Option is clicked below. We move focus to
        // the target instead so the VoiceOver user isn't kicked to the top of the page.
        if (
          this.#hasVoiceOverMovedFocusToOptionsOrAnOption &&
          !this.#isSubMenu
        ) {
          this.#focus();
        }
      }

      this.#activeOption?.click();

      return;
    }

    // `this.#isFilterable` is guarded against because pressing Space is meant to
    // insert a space and not select an Option.
    if (this.open && event.key === ' ' && !this.#isFilterable) {
      event.preventDefault(); // Prevent page scroll

      // If VoiceOver has moved focus, the browser will move focus to `document.body`
      // when Menu is closed after the active Option is clicked below. We move focus to
      // the target instead so the VoiceOver user isn't kicked to the top of the page.
      if (this.#hasVoiceOverMovedFocusToOptionsOrAnOption && !this.#isSubMenu) {
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
          // Prevent the insertion point from moving to the beginning of the Input.
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
            block: 'center', // So Options before the current one are in view.
          });

          // Scrolling the Option into view will scroll both its scrollable container and the
          // page. Scrolling the page so the container is in view can be helpful. But more
          // often than not it's disruptive. So we put scroll back where it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey) {
        const nextOption = this.#optionElements.find((option, index) => {
          return !option.disabled && index > activeOptionIndex;
        });

        if (this.#isFilterable && nextOption) {
          // Prevent the insertion point from moving to the end of the Input.
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
            block: 'center', // So Options after the current one are in view.
          });

          // Scrolling the Option into view will scroll both its scrollable container and the
          // page. Scrolling the page so the container is in view can be helpful. But more
          // often than not it's disruptive. So we put scroll back where it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        ['Home', 'PageUp'].includes(event.key)
      ) {
        // - Prevents page scroll when Menu is not filterable.
        // - Prevents the insertion point from moving when Menu is filterable.
        event.preventDefault();

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

          // Scrolling the Option into view will scroll both its scrollable container and the
          // page. Scrolling the page so the container is in view can be helpful. But more
          // often than not it's disruptive. So we put scroll back where it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        ['End', 'PageDown'].includes(event.key)
      ) {
        // - Prevents page scroll when Menu is not filterable.
        // - Prevents the insertion point from moving when Menu is filterable.
        event.preventDefault();

        if (this.#lastEnabledOption && this.#optionsElement) {
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption.privateTooltipOpen = false;
          this.#activeOption.privateActive = false;

          this.#optionsElement.ariaActivedescendant =
            this.#lastEnabledOption.id;

          this.#lastEnabledOption.privateActive = true;
          this.#lastEnabledOption.privateTooltipOpen = true;

          const { scrollX, scrollY } = window;
          this.#lastEnabledOption.scrollIntoView();

          // Scrolling the Option into view will scroll both its scrollable container and the
          // page. Scrolling the page so the container is in view can be helpful. But more
          // often than not it's disruptive. So we put scroll back where it was.
          window.scrollTo(scrollX, scrollY);
        }

        return;
      }
    }
  }

  #onTargetSlotChange() {
    if (this.#isSubMenu && this.#targetElement instanceof Input) {
      throw new Error(
        'An Input is semantically an invalid target for a sub-Menu.',
      );
    }

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

      if (this.#isSubMenu && this.#parentOption) {
        this.#parentOption.ariaHasPopup = 'true';
      } else if (!this.#isSubMenu && this.#targetElement) {
        this.#targetElement.ariaHasPopup = 'true';
      }

      if (this.#isFilterable && !this.#isSubMenu) {
        this.#targetElement.setAttribute(
          'aria-controls',
          this.#optionsElement.id,
        );
      }

      // We want consumers to use a button as Menu's target. But we've found that's not
      // always the case. So, for their convenience and to ensure accessibility, we make
      // sure the target works correctly.
      //
      // We guard against sub-Menu targets because there's no need for the user to be
      // able to focus them given the entire component, including sub-Menus, can be
      // interacted with via keyboard. That's also why we change `tabIndex` below.
      if (this.#isTargetSpanOrDivOrSvg && !this.#isSubMenu) {
        this.#targetElement.role = 'button';
        this.#targetElement.tabIndex = 0;
      }

      if (this.#isSubMenu && this.#targetElement) {
        // This won't cover every case because the target may be a custom element that has
        // a focusable element in its shadow DOM. Or, for example, the target may be a DIV
        // with a BUTTON inside it.
        //
        // We can't do anything about the former case. Best we can do is document in Menu's
        // story that sub-Menu targets shouldn't be focusable. The latter case is unhandled
        // because of the documentation and for the sake of simplicity.
        this.#targetElement.tabIndex = -1;
      }
    }
  }

  #onTargetSlotClick(event: MouseEvent) {
    this.#isTargetSlotClick = true;

    const closestOption =
      event.target instanceof Element &&
      event.target.closest('glide-core-option');

    const isSubMenuTarget =
      event.target instanceof Element && Boolean(closestOption);

    const isClosestOptionALink =
      closestOption instanceof Option &&
      closestOption.href !== undefined &&
      closestOption.role !== 'option';

    const didMenuCancelTheEvent = isSubMenuTarget && isClosestOptionALink;

    if (isSubMenuTarget && isClosestOptionALink) {
      // When an Option is a link and it has a sub-Menu, clicking the sub-Menu's target
      // shouldn't cause a navigation. So we cancel the event. And we have to cancel it
      // before the timeout.
      event.preventDefault();
    }

    if (isSubMenuTarget) {
      // Sub-Menu target clicks aren't let to propagate because they muddy the waters
      // for consumers. Consumers listen for "click" to know when an Option is clicked.
      // And they listen for "toggle" to know when a Menu or sub-Menu is opened or
      // closed. So sub-Menu target "click" events are just noise.
      event.stopPropagation();
    }

    // The timeout gives consumers a chance to cancel the event to prevent Menu from
    // opening.
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

      // It's `0` when the event came from the user pressing Space or Enter. It's also
      // `0` when a developer calls `click()` or dispatches the event progratically. It's
      // not ideal that we show the Option's tooltip in those cases. But it should be
      // okay.
      if (event.detail === 0) {
        this.privateOpenedViaKeyboard = true;
      }

      if (
        this.#optionElements &&
        this.#optionElements.length > 0 &&
        // If Menu is filterable, Menu doesn't close on click because the user may have
        // clicked the Input to select or change its text.
        this.#isFilterable &&
        // Only the top-level Menu is filterable. All other Menu targets are just buttons
        // of one kind or another. So clicking them should always close the Menu in
        // question.
        !this.#isSubMenu
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
  // the Input should open Menu. And an "input" handler is an easy way to filter out
  // non-character input.
  #onTargetSlotInput() {
    this.open = true;
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

                if (this.#isSubMenu && this.#parentOption) {
                  this.#parentOption.ariaExpanded = 'true';
                } else if (!this.#isSubMenu && this.#targetElement) {
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
