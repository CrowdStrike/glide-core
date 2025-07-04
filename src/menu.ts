import { html, LitElement } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import MenuButton from './menu.button.js';
import { LocalizeController } from './library/localize.js';
import MenuLink from './menu.link.js';
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
    // `capture` ensures `#onDocumentClick` is called before #3, so the button click
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
          @mouseover=${this.#onDefaultSlotMouseover}
          @private-disabled=${this.#onOptionsDisabled}
          @private-slot-change=${this.#onOptionsSlotChange}
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

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isDefaultSlotClick = false;

  #isLoading = false;

  #isOpen = false;

  #isTargetSlotMouseUp = false;

  #localize = new LocalizeController(this);

  #offset: number | undefined;

  #shadowRoot?: ShadowRoot;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  get #activeOption() {
    return this.#optionElements?.find(({ privateActive }) => privateActive);
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDefaultSlotMousedown = (event: Event) => {
    if (event.target === this.#defaultSlotElementRef.value) {
      // So the `#onFocusout` handler, which closes Menu, isn't called when
      // the border or padding on `.default-slot` is clicked.
      event.preventDefault();
    }
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDefaultSlotMouseup = () => {
    this.#isDefaultSlotClick = true;
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = () => {
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
      this.#isTargetSlotMouseUp = false;
      return;
    }

    this.open = false;

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }
  };

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
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

    this.#defaultSlotElementRef.value?.hidePopover();
  }

  #onComponentFocusout(event: FocusEvent) {
    const isMenuFocused =
      event.relatedTarget instanceof HTMLElement &&
      this.#shadowRoot?.contains(event.relatedTarget);

    const isOptionsFocused = event.relatedTarget instanceof MenuOptions;

    const isOptionFocused =
      event.relatedTarget instanceof MenuButton ||
      event.relatedTarget instanceof MenuLink;

    if (!isMenuFocused && !isOptionsFocused && !isOptionFocused) {
      this.open = false;
    }
  }

  #onDefaultSlotClick(event: Event) {
    // So Menu isn't closed when the border or padding on `.default-slot` is clicked.
    if (
      !event.defaultPrevented &&
      event.target !== this.#defaultSlotElementRef.value
    ) {
      this.open = false;
    }
  }

  #onDefaultSlotFocusin(event: FocusEvent) {
    const isButtonOrLink =
      event.target instanceof MenuButton || event.target instanceof MenuLink;

    if (
      isButtonOrLink &&
      this.#activeOption &&
      this.#optionsElement &&
      !event.target.disabled
    ) {
      // The order in which these are set matters when `this.#activeOption` and
      // `event.target` are the same element. Setting `this.#activeOption.privateActive`
      // second will result in no active option.
      this.#activeOption.privateActive = false;
      event.target.privateActive = true;

      this.#optionsElement.ariaActivedescendant = event.target.id;
    }
  }

  #onDefaultSlotMouseover(event: Event) {
    if (
      (event.target instanceof MenuLink ||
        event.target instanceof MenuButton) &&
      !event.target.disabled
    ) {
      if (this.#optionElements) {
        for (const option of this.#optionElements) {
          option.privateActive = option === event.target;
        }
      }

      if (this.#optionsElement) {
        this.#optionsElement.ariaActivedescendant = event.target.id;
      }
    }
  }

  #onOptionsDisabled() {
    if (this.#optionElements && this.#activeOption) {
      const activeOptionIndex = this.#optionElements.indexOf(
        this.#activeOption,
      );

      this.#activeOption.privateActive = false;

      const nextOption = this.#optionElements?.find((option, index) => {
        return !option.disabled && index > activeOptionIndex;
      });

      if (nextOption) {
        nextOption.privateActive = true;
        return;
      }

      const previousOption = this.#optionElements.findLast((option, index) => {
        return !option.disabled && index < activeOptionIndex;
      });

      if (previousOption) {
        previousOption.privateActive = true;
      }
    }
  }

  #onOptionsSlotChange() {
    const firstOption = this.#optionElements?.find(
      (option) => !option.disabled,
    );

    if (!this.#activeOption && firstOption) {
      firstOption.privateActive = true;
    }
  }

  #onSlotKeydown(event: KeyboardEvent) {
    const isSpanOrDiv =
      this.#targetElement instanceof HTMLSpanElement ||
      this.#targetElement instanceof HTMLDivElement;

    if ([' ', 'Enter'].includes(event.key) && this.open) {
      this.#isDefaultSlotClick = true;

      // Enter and Space will produce a "click" event. But so will `#activeOption?.click()`
      // below. Canceling this click simplifies logic elsewhere in this component so that we
      // don't have to account for two successive clicks. Emitting a single click is also
      // likely less confusing to consumers.
      event.preventDefault();

      if (event.key === ' ' && isSpanOrDiv) {
        event.preventDefault(); // Prevent page scroll.
      }

      // For VoiceOver. Options normally don't receive focus. But VoiceOver
      // can focus them programmatically. So we move focus back to the target
      // now that Menu is closed.
      this.#focus();

      this.#activeOption?.click();

      return;
    }

    if ([' ', 'Enter'].includes(event.key) && !this.open && isSpanOrDiv) {
      event.preventDefault(); // Prevent page scroll when Space is pressed.

      // `<span>`s and `<div>`s don't emit "click" events on Enter and Space.
      // If they did, it would get picked up by `#onTargetSlotClick` and we
      // wouldn't need this.
      this.open = true;

      return;
    }

    if (['Escape'].includes(event.key) && this.open) {
      // Prevent Safari from leaving full screen.
      event.preventDefault();

      this.open = false;

      // For VoiceOver. Options normally don't receive focus. But VoiceOver
      // can focus them programmatically. So we move focus back to the target
      // now that Menu is closed.
      this.#focus();

      return;
    }

    if (
      ['ArrowUp', 'ArrowDown'].includes(event.key) &&
      !this.open &&
      this.#activeOption &&
      this.#optionsElement
    ) {
      event.preventDefault(); // Prevent page scroll.

      this.open = true;
      this.#optionsElement.ariaActivedescendant = this.#activeOption.id;

      return;
    }

    if (this.open && this.#activeOption && this.#optionElements) {
      const activeOptionIndex = this.#optionElements.indexOf(
        this.#activeOption,
      );

      // All the logic below could just as well go in a `@keydown` in Menu Button
      // and Menu Link. It's here to mirror the tests, which necessarily test against
      // Menu as a whole because more than one Button or Link is required to test
      // these interactions.
      if (event.key === 'ArrowUp' && !event.metaKey) {
        event.preventDefault(); // Prevent page scroll.

        const previousOption = this.#optionElements.findLast(
          (option, index) => {
            return !option.disabled && index < activeOptionIndex;
          },
        );

        if (previousOption && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = previousOption.id;
          previousOption.privateActive = true;
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey) {
        event.preventDefault(); // Prevent page scroll.

        const nextOption = this.#optionElements.find((option, index) => {
          return !option.disabled && index > activeOptionIndex;
        });

        if (nextOption && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = nextOption.id;
          nextOption.privateActive = true;
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        event.key === 'Home' ||
        event.key === 'PageUp'
      ) {
        event.preventDefault(); // Prevent page scroll.

        const firstOption = [...this.#optionElements]
          .reverse()
          .findLast((option) => !option.disabled);

        if (firstOption && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = firstOption.id;
          firstOption.privateActive = true;
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        event.key === 'End' ||
        event.key === 'PageDown'
      ) {
        event.preventDefault(); // Prevent page scroll.

        const lastOption = [...this.#optionElements].findLast(
          (option) => !option.disabled,
        );

        if (lastOption && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = lastOption.id;
          lastOption.privateActive = true;
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

      this.#targetElement.ariaHasPopup = 'true';
      this.#targetElement.id = uniqueId();

      this.#targetElement.setAttribute(
        'aria-controls',
        this.#optionsElement.id,
      );

      this.#optionsElement.ariaLabelledby = this.#targetElement.id;
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
    if (event.defaultPrevented) {
      return;
    }

    if (this.isTargetDisabled) {
      this.#hide();
      return;
    }

    if (this.#optionElements && this.#optionElements.length > 0) {
      this.open = !this.open;
    }
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
    // A cleaner approach, which would obviate all the optional chaining and
    // conditions throughout, would be to return an empty array if `children`
    // is `undefined`. The problem is test coverage. `MenuOptions`
    // throws when its default slot is empty. So the branch where `children` is
    // `undefined` is never reached.
    let elements: HTMLCollection | Element[] | undefined =
      this.#defaultSlotElementRef.value?.assignedElements()?.at(0)?.children;

    const element = elements?.[0];

    // If we're dealing with a slot, then the consumer of this component has
    // placed a slot inside Menu Options, in which case we need to get its
    // assigned elements instead. Tree Menu is one consumer that does this.
    if (element instanceof HTMLSlotElement) {
      elements = element.assignedElements();
    }

    if (elements) {
      return [...elements].filter(
        (element): element is MenuLink | MenuButton => {
          return element instanceof MenuLink || element instanceof MenuButton;
        },
      );
    }
  }

  #show() {
    this.#cleanUpFloatingUi?.();

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
