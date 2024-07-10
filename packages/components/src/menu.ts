import { LitElement, html } from 'lit';
import {
  type Placement,
  autoUpdate,
  computePosition,
  flip,
  offset,
} from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import GlideCoreMenuButton from './menu.button.js';
import GlideCoreMenuLink from './menu.link.js';
import GlideCoreMenuOptions from './menu.options.js';
import styles from './menu.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu': GlideCoreMenu;
  }
}

/**
 * @description A basic menu.
 *
 * @slot - <glide-core-menu-options>.
 * @slot target - A focusable element against which Menu will be positioned. Opens and closes Menu when interacted with.
 */
@customElement('glide-core-menu')
export default class GlideCoreMenu extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen) {
    this.#isOpen = isOpen;

    if (isOpen && !this.isTargetDisabled && this.#optionsElement) {
      this.#setUpFloatingUi();
      this.#optionsElement.ariaActivedescendant = this.#activeOption?.id ?? '';
    } else if (this.#optionsElement) {
      this.#cleanUpFloatingUi?.();
      this.#optionsElement.ariaActivedescendant = '';
    }

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded =
        isOpen && !this.isTargetDisabled ? 'true' : 'false';
    }
  }

  @property({ reflect: true })
  placement: Placement = 'bottom-start';

  @property({ reflect: true })
  get size() {
    return this.#size;
  }

  set size(size: 'small' | 'large') {
    this.#size = size;

    if (this.#optionsElement) {
      this.#optionsElement.privateSize = size;
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    // 1. The consumer has a click listener on a button.
    // 2. The user clicks the button.
    // 3. The button's click listener is called and it synchronously sets `this.open` to `true`.
    // 4. Now the event bubbles up to this component's click listener on `document`.
    // 5. That click listener sets `open` to `false`.
    // 6. Menu is opened then closed in the same frame and so never opens.
    //
    // Using `capture` ensures this listener is called before #3.
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
    owSlot(this.#defaultSlotElementRef.value);
    owSlot(this.#targetSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreMenuOptions]);

    const firstOption = this.#optionElements?.at(0);

    if (this.open && firstOption && this.#optionsElement) {
      this.#setUpFloatingUi();

      firstOption.privateActive = true;
      this.#optionsElement.ariaActivedescendant = firstOption.id;
    }
  }

  override focus() {
    if (this.#targetElement && 'focus' in this.#targetElement) {
      (this.#targetElement as { focus: () => void })?.focus();
    }
  }

  override render() {
    // The linter wants a "focus" listener on the slot and apparently "focusin" doesn't satisfy it.
    /* eslint-disable lit-a11y/mouse-events-have-key-events */
    return html`
      <div
        class="component"
        @focusout=${this.#onFocusout}
        ${ref(this.#componentElementRef)}
      >
        <slot
          class="target-slot"
          name="target"
          @click=${this.#onTargetSlotClick}
          @keydown=${this.#onSlotKeydown}
          @slotchange=${this.#onTargetSlotChange}
          ${ref(this.#targetSlotElementRef)}
        ></slot>

        <slot
          class=${classMap({
            'default-slot': true,
            visible: this.open && !this.isTargetDisabled,
          })}
          @click=${this.#onDefaultSlotClick}
          @focusin=${this.#onDefaultSlotFocusin}
          @keydown=${this.#onSlotKeydown}
          @mouseover=${this.#onDefaultSlotMouseover}
          @slotchange=${this.#onDefaultSlotChange}
          ${ref(this.#defaultSlotElementRef)}
        ></slot>
      </div>
    `;
  }

  @state()
  private isTargetDisabled = false;

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isClosingAfterSelection = false;

  #isOpen = false;

  #shadowRoot?: ShadowRoot;

  #size: 'small' | 'large' = 'large';

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  get #activeOption() {
    return this.#optionElements?.find(({ privateActive }) => privateActive);
  }

  get #optionsElement() {
    const firstAssignedElement = this.#defaultSlotElementRef.value
      ?.assignedElements()
      .at(0);

    return firstAssignedElement
      ? (firstAssignedElement as GlideCoreMenuOptions)
      : null;
  }

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = (event: MouseEvent) => {
    if (event.target && this.contains(event.target as Node)) {
      return;
    }

    this.open = false;

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }
  };

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [GlideCoreMenuOptions]);

    const firstOption = this.#optionElements?.at(0);

    if (firstOption) {
      firstOption.privateActive = true;
    }

    if (this.#optionsElement) {
      this.#optionsElement.privateSize = this.size;
    }
  }

  #onDefaultSlotClick() {
    this.open = false;

    if (this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
    }
  }

  #onDefaultSlotFocusin(event: FocusEvent) {
    const isButtonOrLink =
      event.target instanceof GlideCoreMenuButton ||
      event.target instanceof GlideCoreMenuLink;

    if (isButtonOrLink && this.#activeOption && this.#optionsElement) {
      this.#activeOption.privateActive = false;
      event.target.privateActive = true;
      this.#optionsElement.ariaActivedescendant = event.target.id;
    }
  }

  #onDefaultSlotMouseover(event: Event) {
    if (
      event.target instanceof GlideCoreMenuLink ||
      event.target instanceof GlideCoreMenuButton
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

  #onFocusout(event: FocusEvent) {
    const isMenuFocused =
      event.relatedTarget instanceof HTMLElement &&
      this.#shadowRoot?.contains(event.relatedTarget);

    const isOptionFocused =
      event.relatedTarget instanceof HTMLElement &&
      this.contains(event.relatedTarget);

    if (!isMenuFocused && !isOptionFocused) {
      this.open = false;
    }
  }

  #onSlotKeydown(event: KeyboardEvent) {
    if (
      [' ', 'Enter', 'Escape'].includes(event.key) &&
      this.open &&
      this.#optionsElement
    ) {
      this.open = false;
      this.#optionsElement.ariaActivedescendant = '';
      this.focus();

      // `#onTargetSlotClick` is called on click, and it opens or closes Menu.
      // Space and Enter produce "click" events. This property gives `#onTargetSlotClick`
      // the information it needs to guard against immediately reopening Menu
      // after it's closed here.
      this.#isClosingAfterSelection = true;
      return;
    }

    if (
      [' ', 'ArrowUp', 'ArrowDown'].includes(event.key) &&
      !this.open &&
      this.#activeOption &&
      this.#optionsElement
    ) {
      event.preventDefault(); // Prevent scroll.

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
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements?.at(activeOptionIndex - 1);

        if (option && activeOptionIndex !== 0 && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = option.id;
          option.privateActive = true;
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey && this.#optionsElement) {
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements?.at(activeOptionIndex + 1);

        if (option) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = option.id;
          option.privateActive = true;
        }

        return;
      }

      if (
        (event.key === 'ArrowUp' && event.metaKey) ||
        event.key === 'Home' ||
        event.key === 'PageUp'
      ) {
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements?.at(0);

        if (option && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = option.id;
          option.privateActive = true;
        }

        return;
      }

      if (
        (event.key === 'ArrowDown' && event.metaKey) ||
        event.key === 'End' ||
        event.key === 'PageDown'
      ) {
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements?.at(-1);

        if (option && this.#optionsElement) {
          this.#activeOption.privateActive = false;
          this.#optionsElement.ariaActivedescendant = option.id;
          option.privateActive = true;
        }

        return;
      }
    }
  }

  #onTargetSlotChange() {
    owSlot(this.#targetSlotElementRef.value);

    const isDisabled =
      this.#targetElement &&
      'disabled' in this.#targetElement &&
      this.#targetElement.disabled;

    const isAriaDisabled =
      this.#targetElement && this.#targetElement.ariaDisabled === 'true';

    this.isTargetDisabled = Boolean(isDisabled) || Boolean(isAriaDisabled);

    if (this.#targetElement && this.#optionsElement) {
      this.#targetElement.ariaHasPopup = 'true';

      this.#targetElement.ariaExpanded =
        this.open && !this.isTargetDisabled ? 'true' : 'false';

      this.#targetElement.id = window.crypto.randomUUID();

      this.#targetElement.setAttribute(
        'aria-controls',
        this.#optionsElement.id,
      );

      this.#optionsElement.ariaLabelledby = this.#targetElement.id;
    }
  }

  #onTargetSlotClick() {
    if (this.isTargetDisabled || this.#isClosingAfterSelection) {
      this.#isClosingAfterSelection = false;
      return;
    }

    if (this.#targetElement instanceof HTMLElement) {
      this.#targetElement.ariaExpanded = this.open ? 'true' : 'false';
    }

    this.open = !this.open;

    if (this.open && this.#activeOption && this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = this.#activeOption.id;
    } else if (!this.open && this.#optionsElement) {
      this.#optionsElement.ariaActivedescendant = '';
      this.focus();
    }
  }

  get #optionElements() {
    // A cleaner approach, which would obviate all the optional chaining and
    // conditions throughout, would be to return an empty array if `children`
    // is `undefined`. The problem is test coverage. `GlideCoreMenuOptions`
    // throws if its default slot is empty. So the branch where `children` is
    // `undefined` is never reached.
    const children = this.#defaultSlotElementRef.value
      ?.assignedElements()
      ?.at(0)?.children;

    if (children) {
      return [...children].filter(
        (element): element is GlideCoreMenuLink | GlideCoreMenuButton => {
          return (
            element instanceof GlideCoreMenuLink ||
            element instanceof GlideCoreMenuButton
          );
        },
      );
    }
  }

  #setUpFloatingUi() {
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
                  middleware: [
                    offset({
                      mainAxis:
                        Number.parseFloat(
                          window
                            .getComputedStyle(document.body)
                            .getPropertyValue('--glide-core-spacing-xxs'),
                        ) * 16,
                    }),
                    flip(),
                  ],
                },
              );

              this.#defaultSlotElementRef.value.dataset.placement = placement;

              Object.assign(this.#defaultSlotElementRef.value.style, {
                left: `${x}px`,
                top: `${y}px`,
              });
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
