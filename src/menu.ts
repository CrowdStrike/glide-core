import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import MenuOptions from './menu.options.js';
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

// TODO: explain here in long form why this component is built the way it is.
// TODO: what if active submenu's target is disabled programmatically?
// TODO: throughout: handle previously active option being disabled
// TODO: i'm checking for HTMLElement in places but SVGs are Elements and an SVG can have role="menu-item"
// TODO: submenu dispatches a toggle event when menu is closed and the document is clicked
// TODO: think about custom elements in menu options: how it would affect the component and also submenus
// TODO: submenu icon padding should extend to top of option
// TODO: how will consumers know what menuitem was clicked without a label attribute and without an ID?
// TODO: comment in story: html rules still apply: you cant have a link submenued in a link
// TODO: Design needs to be happy with submenu positoning. they're next to the submenu item not the item
// TODO: icon slot
// TODO: submenu slot
// TODO: open submenu, click input field. submenu closes.
// TODO: should i stoppropgation of all submenu toggle events?

/**
 * @attr {boolean} [loading=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {MenuOptions}
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

    const options = this.querySelector('glide-core-menu-options');

    if (options && this.#targetElement) {
      options.privateLoading = isLoading;

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

    // 1. The consumer has a click handler on a button.
    // 2. The user clicks the button.
    // 3. The button's click handler is called and sets `this.open` to `true`.
    // 4. The "click" event bubbles up and is handled by `#onDocumentClick`.
    // 5. That handler sets `open` to `false` because the click came from outside Menu.
    // 6. Menu is opened then closed in the same frame and so never opens.
    //
    // `capture` ensures `#onDocumentClick()` is called before #3, so the button click
    // handler setting `open` to `true` isn't overwritten by this handler setting `open`
    // to `false`.
    document.addEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
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
    const options = this.querySelector('glide-core-menu-options');

    if (options && this.#targetElement) {
      options.privateLoading = this.loading;

      this.#targetElement.ariaDescription = this.loading
        ? this.#localize.term('loading')
        : null;
    }

    if (this.#defaultSlotElementRef.value) {
      // `popover` is used so the options can break out of Modal or another container
      // that has `overflow: hidden`. And elements with `popover` are positioned
      // relative to the viewport. Thus Floating UI in addition to `popover`.
      //
      // Set here instead of in the template to escape Lit Analzyer, which isn't
      // aware of `popover` and doesn't have a way to disable a rule ("no-unknown-attribute").
      //
      // "auto" means only one popover can be open at a time. Consumers, however, may
      // have popovers in own components that need to be open while this one is open.
      //
      // "auto" also automatically opens the popover when its target is clicked. We want
      // it to remain closed when clicked when there are no menu options.
      this.#defaultSlotElementRef.value.popover = 'manual';

      if (this.open && !this.isTargetDisabled) {
        this.#show();
      }
    }

    // Menu's "click" handler on `document` listens for clicks in the capture phase. There's
    // a comment in `connectedCallback()` explaining why. `#isTargetSlotMouseUp` must be set
    // before that handler is called so it has the information it needs to determine whether
    // or not to close Menu.
    this.#targetSlotElementRef.value?.addEventListener(
      'mouseup',
      this.#onTargetSlotMouseup,
    );

    this.#defaultSlotElementRef.value?.addEventListener(
      'mousedown',
      this.#onDefaultSlotMousedown,
    );

    this.#defaultSlotElementRef.value?.addEventListener(
      'mouseup',
      this.#onDefaultSlotMouseup,
    );
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
    // The linter wants a "focus" handler on the slot and apparently "focusin" doesn't satisfy it.
    //
    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`
      <div
        class="component"
        @focusout=${this.#onComponentFocusout}
        ${ref(this.#componentElementRef)}
      >
        <slot
          class="target-slot"
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onSlotKeydown}
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
          id="default-slot"
          @click=${this.#onDefaultSlotClick}
          @focusin=${this.#onDefaultSlotFocusin}
          @keydown=${this.#onSlotKeydown}
          @mouseover=${this.#onDefaultSlotMouseover}
          @private-slot-change=${this.#onOptionsSlotChange}
          @slotchange=${this.#onDefaultSlotChange}
          ${assertSlot([MenuOptions])}
          ${ref(this.#defaultSlotElementRef)}
        >
          <!--
            @required
            @type {MenuOptions}
          -->
        </slot>
      </div>
    `;
  }

  #activeOption?: HTMLElement | null;

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  // TODO: say how this is used
  #isDefaultSlotClick = false;

  #isLoading = false;

  #isOpen = false;

  // TODO: say what for
  #isSubmenuKeydown = false;

  #isSubmenuOpen = false;

  // TODO: explain this
  #isTargetSlotMouseUp = false;

  #localize = new LocalizeController(this);

  #offset: number | undefined;

  #previouslyActiveOption?: HTMLElement | null;

  #shadowRoot?: ShadowRoot;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  get #isSubmenu() {
    return Boolean(
      this.closest('glide-core-menu')?.parentElement?.closest(
        'glide-core-menu',
      ),
    );
  }

  get #isTargetCombobox() {
    return this.#targetElement?.role === 'combobox';
  }

  get #firstEnabledOption() {
    return this.#optionElements?.find(
      (option) =>
        ('disabled' in option && !option.disabled) ||
        option.ariaDisabled !== 'true',
    );
  }

  get #lastEnabledOption() {
    return this.#optionElements?.findLast((option) => {
      const isDisabled =
        // TODO: explain disable
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ('disabled' in option && option.disabled) ||
        option.ariaDisabled === 'true';

      return !isDisabled;
    });
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDefaultSlotMousedown = (event: Event) => {
    const isDefaultSlotClick =
      event.target === this.#defaultSlotElementRef.value;

    if (isDefaultSlotClick) {
      // So the `#onFocusout()` handler, which closes Menu, isn't called when
      // the border or padding on `.default-slot` is clicked.
      event.preventDefault();
    }

    // TODO: keep and remove the condition above. prevents focus from moving to options.
    // TODO: if this stays, remoev focus() calls
    event.preventDefault();
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDefaultSlotMouseup = () => {
    this.#isDefaultSlotClick = true;
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = () => {
    // TODO: only the main menu needs a document click handler. or do all need one so they all close?
    if (!this.open) {
      // TDOO: say why. no need to run this code. multiple menus on the page.
      return;
    }

    // So Menu isn't closed when the border or padding on `.default-slot` is clicked.
    //
    // Checking that the click's `event.target` is equal to `#defaultSlotElementRef.value`
    // would be simpler. But, when the target is inside of another web component,
    // `event.target` will be that component. Same for the conditions below.
    if (this.#isDefaultSlotClick) {
      this.#isDefaultSlotClick = false;
      return;
    }

    if (this.#isTargetSlotMouseUp) {
      return;
    }

    this.open = false;

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  // TODO: say why not simply use @eventOptions({capture: true})
  #onTargetSlotMouseup = () => {
    this.#isTargetSlotMouseUp = true;
  };

  #focus(options?: FocusOptions) {
    if (this.#targetElement && 'focus' in this.#targetElement) {
      (
        this.#targetElement as { focus: (options?: FocusOptions) => void }
      )?.focus(options);
    }
  }

  #hide() {
    this.#cleanUpFloatingUi?.();

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded = 'false';
    }

    if (this.#activeOption) {
      this.#activeOption.style.backgroundColor = '';
      this.#previouslyActiveOption = this.#activeOption;
      this.#activeOption = null;
    }

    this.#defaultSlotElementRef.value?.hidePopover();
  }

  #onComponentFocusout(event: FocusEvent) {
    const isMenuFocused =
      event.relatedTarget instanceof HTMLElement &&
      this.#shadowRoot?.contains(event.relatedTarget);

    const isOptionsFocused = event.relatedTarget instanceof MenuOptions;

    const isOptionFocused = this.#optionElements?.some(
      (option) => option === event.relatedTarget,
    );

    if (!isMenuFocused && !isOptionsFocused && !isOptionFocused) {
      // this.open = false;
    }
  }

  #onDefaultSlotChange() {
    if (this.#optionsElement) {
      // TODO: also monitor target disabled change
      const observer = new MutationObserver(() => {
        const isActiveOptionDisabled =
          this.#activeOption &&
          'disabled' in this.#activeOption &&
          this.#activeOption.disabled;

        if (
          this.#activeOption &&
          isActiveOptionDisabled &&
          this.#optionElements
        ) {
          const activeOptionIndex = this.#optionElements.indexOf(
            this.#activeOption,
          );

          this.#activeOption.style.backgroundColor = '';
          this.#activeOption = null;

          const nextOption = this.#optionElements?.find((option, index) => {
            const isDisabled =
              // TODO: explain disable
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              ('disabled' in option && option.disabled) ||
              option.ariaDisabled === 'true';

            return !isDisabled && index > activeOptionIndex;
          });

          if (nextOption) {
            this.#activeOption = nextOption;
            this.#previouslyActiveOption = nextOption;
            nextOption.dataset.privateActive = 'true';
            return;
          }

          const previousOption = this.#optionElements.findLast(
            (option, index) => {
              const isDisabled =
                // TODO: explain disable
                // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
                ('disabled' in option && option.disabled) ||
                option.ariaDisabled === 'true';

              return !isDisabled && index < activeOptionIndex;
            },
          );

          if (previousOption) {
            previousOption.dataset.privateActive = 'true';
          }
        }
      });

      observer.observe(this.#optionsElement, {
        attributeFilter: ['aria-disabled', 'disabled'],
        subtree: true,
      });
    }
  }

  #onDefaultSlotClick(event: Event) {
    // TODO: explain: closest
    const target =
      event.target instanceof SVGElement
        ? event.target.parentNode
        : event.target;

    // TODO: this shoudl always be a boolean
    // TODO: clean this up and say why the Menu or Menu Options: click on padding around submenu. but why both Menu and Menu Options?
    const isSubmenuTargetClick =
      target instanceof HTMLElement &&
      (target.closest('[slot="target"]') ||
        target instanceof Menu ||
        target instanceof MenuOptions);

    if (
      !event.defaultPrevented &&
      // So Menu isn't closed when the border or padding on the default slot is clicked.
      target !== this.#defaultSlotElementRef.value &&
      // TODO: explain
      !isSubmenuTargetClick
    ) {
      this.open = false;
      // this.#focus();
    } else if (isSubmenuTargetClick) {
      console.log('submenu click');
      // TODO: explain
      // fixes issue where open a nested submenu then press arrow left. both submenus are closed because first submenu target has focus.
      // TODO: add defaultprevented to condition above?
      // TODO: only focus if combobox to keep focus on input
      // TODO: how to prevent options from receiving focus in the first place on click
      // this.#focus();
    }
  }

  // TODO: say why this handler is needed
  #onDefaultSlotFocusin(event: FocusEvent) {
    if (event.target instanceof HTMLElement) {
      const isTargetMenuItem = event.target.role === 'menuitem';

      // TODO: handle SVG case
      const isTargetSubmenuMenuItem =
        event.target.closest('glide-core-menu') !== this;

      const isTargetDisabled =
        // TODO: explain disable
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ('disabled' in event.target && event.target.disabled) ||
        event.target.ariaDisabled === 'true';

      if (
        isTargetMenuItem &&
        this.#activeOption &&
        this.#optionsElement &&
        !isTargetDisabled &&
        !isTargetSubmenuMenuItem
      ) {
        // The order in which these are set matters when `this.#activeOption` and
        // `event.target` are the same element. Setting `this.#activeOption.privateActive`
        // second will result in no active option.
        // TODO: rework or remove comment
        this.#activeOption.style.backgroundColor = '';
        this.#activeOption = event.target;

        event.target.style.backgroundColor =
          'var(--glide-core-color-interactive-surface-container--hover)';

        this.#optionsElement.ariaActivedescendant = event.target.id;
      }
    }
  }

  #onDefaultSlotMouseover(event: Event) {
    const isSubmenuOption = this.#optionElements?.every(
      (option) => option !== event.target,
    );

    // TODO: explain
    if (event.target && !isSubmenuOption) {
      // TODO: also check here and elsewhere if element is actual option. what else?
      // TODO: why support option?
      const isOption =
        event.target instanceof HTMLElement &&
        (event.target.role === 'menuitem' || event.target.role === 'option');

      // TODO: use elsewhere
      const isDisabled =
        // TODO: explain disable
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        ('disabled' in event.target && event.target.disabled) ||
        (event.target instanceof HTMLElement &&
          event.target.ariaDisabled === 'true');

      if (isOption && !isDisabled) {
        this.#previouslyActiveOption = this.#activeOption;
        this.#activeOption = event.target;

        if (this.#optionElements) {
          for (const option of this.#optionElements) {
            option.style.backgroundColor =
              option === event.target
                ? 'var(--glide-core-color-interactive-surface-container--hover)'
                : '';
          }
        }

        if (this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant = event.target.id;
        }
      }
    }
  }

  #onOptionsSlotChange() {
    // TODO: do i need to check if element is HTMLElement because i'm calling click() on it elsewhere?
    const wasActiveOptionRemoved = this.#optionElements?.every(
      (option) => option !== this.#activeOption,
    );

    if (wasActiveOptionRemoved && this.#firstEnabledOption) {
      this.#activeOption = this.#firstEnabledOption;

      this.#firstEnabledOption.style.backgroundColor =
        'var(--glide-core-color-interactive-surface-container--hover)';
    }

    if (this.#optionElements) {
      for (const option of this.#optionElements) {
        // TODO: throw if option already has ID
        option.id = uniqueId();
        // TODO: set ariaactivedescdenat

        const submenu = option.querySelector('glide-core-menu');

        if (submenu) {
          const observer = new MutationObserver(() => {
            const targetElement = submenu.querySelector('[slot="target"]');

            // TODO: say why mutation observer is used to change style. open and closed all over the place.
            // TODO: why not listen for toggle instead?
            if (
              targetElement instanceof HTMLElement ||
              targetElement instanceof SVGElement
            ) {
              targetElement.style.color = submenu.open
                ? 'var(--glide-core-color-interactive-text-link--hover)'
                : '';
            }

            // TODO: say when listen on every submenu. divert keydown to sub-submenus
            this.#isSubmenuOpen = submenu.open;
          });

          observer.observe(submenu, { attributeFilter: ['open'] });
        }
      }
    }
  }

  #onSlotInput() {
    // TODO: just open in keydown given i need that handler regardless? or keep this because it account for the event being canceled?
    // TODO: either way, should i account in the keydown handler for the event being canceled?
    this.open = true;
  }

  // TODO: say why this handler is on both slots
  #onSlotKeydown(event: KeyboardEvent) {
    // TODO: explain
    if (event.target !== this.#targetElement) {
      return;
    }

    const submenu = this.#activeOption?.querySelector('glide-core-menu');

    if (this.open && this.#isSubmenuOpen) {
      // TODO: can this be moved out of here? is it needed?
      if (
        [
          ' ',
          'Enter',
          'ArrowDown',
          'ArrowUp',
          'PageDown',
          'PageUp',
          'Home',
          'End',
        ].includes(event.key)
      ) {
        // TODO: explain. prevent default prevents the enter click from reaching the
        // document and isDefaultSlotClick prevents the document handler from closing menu
        // on activeOption.click()
        // TODO: say how this also, as a side effect, stops click from reaching other click handlers
        // TODO: explain how new event is dispatched and scroll will prevented on it. but original event scroll's won't.
        event.preventDefault(); // Prevent page scroll.
      }

      // TODO: say why.
      const isArrowingHorizontallyWithMeta =
        ['ArrowRight', 'ArrowLeft'].includes(event.key) && event.metaKey;

      if (!isArrowingHorizontallyWithMeta) {
        const eventCopy = new KeyboardEvent(event.type, {
          bubbles: true,
          key: event.key,
          metaKey: event.metaKey,
          shiftKey: event.shiftKey,
          cancelable: true,
        });

        // TODO: say why.
        // eslint-disable-next-line @crowdstrike/glide-core/event-dispatch-from-this
        submenu?.querySelector('[slot="target"]')?.dispatchEvent(eventCopy);

        // TODO: explain
        eventCopy.stopPropagation();
        eventCopy.stopImmediatePropagation();

        // TODO: OOF. explain this. prevent insertion pont from moving right and left when subsubmenu is available or opened.
        if (eventCopy.defaultPrevented) {
          event.preventDefault();
        }
      }

      // TODO: don't focus if submenu of submenu
      // TODO: explain what this is for
      // TODO: both are only necessary for non combobox case. why is that?
      // TODO: Enter in combobox case selects all text in the field
      if ([' ', 'Enter'].includes(event.key) && !this.#isSubmenu) {
        // this.#focus();
      }

      return;
    }

    if (event.key === 'ArrowRight' && submenu && this.open && !event.metaKey) {
      // TODO: say why: insertion point
      event.preventDefault();
      submenu.open = true;

      return;
    }

    // TODO: explain isSubmenu
    if (
      event.key === 'ArrowLeft' &&
      this.open &&
      this.#isSubmenu &&
      !event.metaKey
    ) {
      event.preventDefault();
      this.open = false;

      return;
    }

    const isTargetSpanOrDiv =
      this.#targetElement instanceof HTMLSpanElement ||
      this.#targetElement instanceof HTMLDivElement;

    if (event.key === 'Enter' && this.open && !event.defaultPrevented) {
      if (!this.#isTargetCombobox) {
        // TODO: adjust comment to account for combobox
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
        this.#focus();
      }

      // TODO: say why. so the click event comes from the option doesnt cause document click to close dropdown then regular click handler to reopen it.
      this.#isDefaultSlotClick = true;
      this.#activeOption?.click();
      this.#isDefaultSlotClick = false;

      return;
    }

    // TODO: pressing space
    // TODO: say why combobox is excluded
    if (event.key === ' ' && this.open && !this.#isTargetCombobox) {
      // TODO: how is page scroll prevents if it's not a span or div?
      event.preventDefault(); // Prevent page scroll.

      // TODO: say why. so the click event comes from the option.
      // TODO: rename this variable. it's not a defaultslotclick
      this.#isDefaultSlotClick = true;
      this.#activeOption?.click();
      this.#isDefaultSlotClick = false;

      return;
    }

    // TODO: rethink the span and div thing now that submenus targets are likely spans or divs. does it matter?
    if ([' ', 'Enter'].includes(event.key) && !this.open && isTargetSpanOrDiv) {
      event.preventDefault(); // Prevent page scroll when Space is pressed.

      // TODO: does this make sense?
      // `<span>`s and `<div>`s don't emit "click" events on Enter and Space.
      // If they did, it would get picked up by `#onTargetSlotClick()` and we
      // wouldn't need this.
      this.open = true;

      return;
    }

    if (event.key === ' ' && !this.#isOpen && this.#isTargetCombobox) {
      // TODO: explain. enters a space and opens when the user only wants to open
      event.preventDefault();

      // TODO: say why. because canceling the event prevents it from reaching the input handler
      this.open = true;
    }

    if (['Escape'].includes(event.key) && this.open) {
      event.preventDefault(); // Prevent Safari from leaving full screen.

      this.open = false;

      // For VoiceOver. Options normally don't receive focus. But VoiceOver
      // can focus them programmatically. So we move focus back to the target
      // now that Menu is closed.

      // TODO: explain
      if (!this.#isSubmenu) {
        this.#focus();
      }

      return;
    }

    if (
      ['ArrowUp', 'ArrowDown'].includes(event.key) &&
      !this.open &&
      this.#optionsElement
    ) {
      event.preventDefault(); // Prevent page scroll.

      this.open = true;

      if (this.#previouslyActiveOption) {
        this.#activeOption = this.#previouslyActiveOption;
        this.#optionsElement.ariaActivedescendant = this.#activeOption.id;
      } else if (this.#firstEnabledOption) {
        this.#activeOption = this.#firstEnabledOption;
        this.#optionsElement.ariaActivedescendant = this.#activeOption.id;
      }

      return;
    }

    if (this.open && this.#activeOption && this.#optionElements) {
      const activeOptionIndex = this.#optionElements.indexOf(
        this.#activeOption,
      );

      // TODO: rework for remove
      // All the logic below could just as well go in a `@keydown` in Menu Button
      // and Menu Link. It's here to mirror the tests, which necessarily test against
      // Menu as a whole because more than one Button or Link is required to test
      // these interactions.
      if (event.key === 'ArrowUp' && !event.metaKey) {
        event.preventDefault(); // Prevent page scroll.

        const previousOption = this.#optionElements.findLast(
          (option, index) => {
            const isDisabled =
              // TODO: explain disable
              // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
              ('disabled' in option && option.disabled) ||
              option.ariaDisabled === 'true';

            return !isDisabled && index < activeOptionIndex;
          },
        );

        if (previousOption && this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant = previousOption.id;
          this.#activeOption.style.backgroundColor = '';
          this.#activeOption = previousOption;

          previousOption.style.backgroundColor =
            'var(--glide-core-color-interactive-surface-container--hover)';
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey) {
        event.preventDefault(); // Prevent page scroll.

        const nextOption = this.#optionElements.find((option, index) => {
          const isDisabled =
            // TODO: explain disable
            // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
            ('disabled' in option && option.disabled) ||
            option.ariaDisabled === 'true';

          return !isDisabled && index > activeOptionIndex;
        });

        if (nextOption && this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant = nextOption.id;
          this.#activeOption.style.backgroundColor = '';
          this.#activeOption = nextOption;

          nextOption.style.backgroundColor =
            'var(--glide-core-color-interactive-surface-container--hover)';
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        ['Home', 'PageUp'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll.

        if (this.#firstEnabledOption && this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant =
            this.#firstEnabledOption.id;

          this.#activeOption.style.backgroundColor = '';
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption = this.#firstEnabledOption;

          this.#firstEnabledOption.style.backgroundColor =
            'var(--glide-core-color-interactive-surface-container--hover)';
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        ['End', 'PageDown'].includes(event.key)
      ) {
        event.preventDefault(); // Prevent page scroll.

        if (this.#lastEnabledOption && this.#optionsElement) {
          this.#optionsElement.ariaActivedescendant =
            this.#lastEnabledOption.id;

          this.#activeOption.style.backgroundColor = '';
          this.#previouslyActiveOption = this.#activeOption;
          this.#activeOption = this.#lastEnabledOption;

          this.#lastEnabledOption.style.backgroundColor =
            'var(--glide-core-color-interactive-surface-container--hover)';
        }

        return;
      }
    }
  }

  #onTargetSlotChange() {
    const observer = new MutationObserver(() => {
      if (this.open && !this.isTargetDisabled) {
        this.#show();
      } else {
        this.#hide();
      }
    });

    if (this.#targetElement && this.#optionsElement) {
      observer.observe(this.#targetElement, {
        attributes: true,
        attributeFilter: ['aria-disabled', 'disabled'],
      });

      // TODO: say why
      this.#targetElement.id = uniqueId();

      this.#targetElement.setAttribute(
        'aria-controls',
        this.#optionsElement.id,
      );

      this.#optionsElement.ariaLabelledby = this.#targetElement.id;

      if (
        this.#targetElement instanceof HTMLButtonElement ||
        this.#targetElement.role === 'button'
      ) {
        this.#targetElement.ariaHasPopup = 'true';
      }
    }

    const isSpanOrDiv =
      this.#targetElement instanceof HTMLSpanElement ||
      this.#targetElement instanceof HTMLDivElement;

    // We think consumers should always use a `<button>` as Menu's target. But
    // we've found that's not always the case. So for consumers' convenience, to
    // reduce support on our end, and to ensure accessibility we decided to bake
    // support for other elements into Menu.
    if (isSpanOrDiv && this.#targetElement instanceof HTMLElement) {
      this.#targetElement.tabIndex = 0;
    }

    if (this.open && !this.isTargetDisabled) {
      this.#show();
    } else {
      this.#hide();
    }
  }

  #onTargetSlotClick(event: Event) {
    // TODO: say why
    if (event.defaultPrevented) {
      return;
    }

    if (this.isTargetDisabled) {
      // TODO: why hide? shouldn't it already be hidden?
      this.#hide();
      return;
    }

    // TODO: say why
    if (
      this.#optionElements &&
      this.#optionElements.length > 0 &&
      this.#isTargetCombobox
    ) {
      this.open = true;
    } else if (this.#optionElements && this.#optionElements.length > 0) {
      this.open = !this.open;
    }

    // TODO: explain. coudl also be at top. consider defaultprevented case above
    this.#isTargetSlotMouseUp = false;
  }

  get #optionsElement() {
    const firstAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .at(0);

    return firstAssignedElement instanceof MenuOptions
      ? firstAssignedElement
      : null;
  }

  get #optionElements() {
    // TODO: rework comment
    // A cleaner approach, which would obviate all the optional chaining and
    // conditions throughout, would be to return an empty array if `children`
    // is `undefined`. The problem is test coverage. `MenuOptions`
    // throws when its default slot is empty. So the branch where `children` is
    // `undefined` is never reached.
    let elements: HTMLCollection | Element[] | undefined =
      this.#defaultSlotElementRef.value?.assignedElements()?.at(0)?.children;

    const element = elements?.[0];

    // TODO: rework
    // If we're dealing with a slot, then the consumer of this component has
    // placed a slot inside Menu Options, in which case we need to get its
    // assigned elements instead.
    if (element instanceof HTMLSlotElement) {
      elements = element.assignedElements();
    }

    if (elements) {
      return [...elements].filter((element): element is HTMLElement => {
        return (
          element instanceof HTMLElement &&
          (element.role === 'menuitem' || element.role === 'option')
        );
      });
    }
  }

  #show() {
    this.#cleanUpFloatingUi?.();

    if (this.#previouslyActiveOption) {
      this.#activeOption = this.#previouslyActiveOption;

      this.#activeOption.style.backgroundColor =
        'var(--glide-core-color-interactive-surface-container--hover)';
    } else if (this.#firstEnabledOption) {
      this.#firstEnabledOption.style.backgroundColor =
        'var(--glide-core-color-interactive-surface-container--hover)';

      this.#activeOption = this.#firstEnabledOption;
      this.#previouslyActiveOption = this.#firstEnabledOption;
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

  get #targetElement() {
    return this.#targetSlotElementRef.value?.assignedElements().at(0);
  }
}
