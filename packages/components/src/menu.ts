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
import styles from './menu.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-menu': GlideCoreMenu;
  }
}

/**
 * @description A basic menu.
 *
 * @slot - One or more of <glide-core-menu-link> or <glide-core-menu-button>.
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

    if (isOpen && !this.isTargetDisabled) {
      this.#setUpFloatingUi();
      this.ariaActivedescendant = this.activeOption?.id ?? '';
    } else {
      this.#cleanUpFloatingUi?.();
      this.ariaActivedescendant = '';
    }

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded =
        isOpen && !this.isTargetDisabled ? 'true' : 'false';
    }
  }

  @property({ reflect: true })
  placement: Placement = 'bottom-start';

  @property({ reflect: true })
  size: 'small' | 'large' = 'large';

  private get activeOption() {
    return this.#optionElements?.find(({ privateActive }) => privateActive);
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

    // `Text` is allowed so slotted content can be rendered asychronously. Think of
    // a case where the only slotted content is a `repeat` whose array is empty
    // at first then populated after a fetch.
    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
      Text,
    ]);

    const firstOption = this.#optionElements.at(0);

    if (this.open && firstOption) {
      this.#setUpFloatingUi();

      firstOption.privateActive = true;
      this.ariaActivedescendant = firstOption.id;
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
        <div class="container" id="container">
          <slot
            name="target"
            @click=${this.#onTargetSlotClick}
            @keydown=${this.#onSlotKeydown}
            @slotchange=${this.#onTargetSlotChange}
            ${ref(this.#targetSlotElementRef)}
          ></slot>
        </div>

        <div
          aria-activedescendant=${this.ariaActivedescendant}
          aria-labelledby="container"
          class=${classMap({
            menu: true,
            large: this.size === 'large',
            small: this.size === 'small',
            visible: this.open && !this.isTargetDisabled,
          })}
          data-test="menu"
          role="menu"
          tabindex="-1"
          ${ref(this.#optionsElementRef)}
        >
          <slot
            @click=${this.#onDefaultSlotClick}
            @focusin=${this.#onDefaultSlotFocusin}
            @keydown=${this.#onSlotKeydown}
            @mouseover=${this.#onDefaultSlotMouseover}
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </div>
      </div>
    `;
  }

  // A getter that returns `this.activeOption?.id` would nicer. But
  // `ariaActivedescendant` isn't always equal to `this.activeOption.id`
  // because `ariaActiveDescendant` is set to an empty string when Menu
  // is closed, and `this.activeOption` is left alone so the active option
  // is preserved when Menu is reopened.
  @state()
  private ariaActivedescendant = '';

  @state()
  private isTargetDisabled = false;

  #cleanUpFloatingUi?: ReturnType<typeof autoUpdate>;

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isClosingAfterSelection = false;

  #isOpen = false;

  #optionsElementRef = createRef<HTMLUListElement>();

  #shadowRoot?: ShadowRoot;

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onDocumentClick = (event: MouseEvent) => {
    if (event.target && this.contains(event.target as Node)) {
      return;
    }

    this.open = false;
    this.ariaActivedescendant = '';
  };

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);

    owSlotType(this.#defaultSlotElementRef.value, [
      GlideCoreMenuButton,
      GlideCoreMenuLink,
      Text,
    ]);

    const firstOption = this.#optionElements.at(0);

    if (firstOption) {
      firstOption.privateActive = true;
    }
  }

  #onDefaultSlotClick() {
    this.open = false;
    this.ariaActivedescendant = '';
  }

  #onDefaultSlotFocusin(event: FocusEvent) {
    const isButtonOrLink =
      event.target instanceof GlideCoreMenuButton ||
      event.target instanceof GlideCoreMenuLink;

    if (isButtonOrLink && this.activeOption) {
      this.activeOption.privateActive = false;
      event.target.privateActive = true;
      this.ariaActivedescendant = event.target.id;
    }
  }

  #onDefaultSlotMouseover(event: Event) {
    if (
      event.target instanceof GlideCoreMenuLink ||
      event.target instanceof GlideCoreMenuButton
    ) {
      for (const option of this.#optionElements) {
        option.privateActive = option === event.target;
      }

      this.ariaActivedescendant = event.target.id;
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
    if ([' ', 'Enter', 'Escape'].includes(event.key) && this.open) {
      this.open = false;
      this.ariaActivedescendant = '';
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
      this.activeOption
    ) {
      event.preventDefault(); // Prevent scroll.

      this.open = true;
      this.ariaActivedescendant = this.activeOption.id;

      return;
    }

    if (this.open && this.activeOption) {
      const activeOptionIndex = this.#optionElements.indexOf(this.activeOption);

      // All the logic below could just as well go in a `@keydown` in Button and Link.
      // It's here to mirror the tests, which necessarily test against Menu as a whole
      // because more than one Button or Link is required to test these interactions.
      if (event.key === 'ArrowUp' && !event.metaKey) {
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements.at(activeOptionIndex - 1);

        if (option && activeOptionIndex !== 0) {
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = option.id;
          option.privateActive = true;
        }

        return;
      }

      if (event.key === 'ArrowDown' && !event.metaKey) {
        event.preventDefault(); // Prevent scroll.

        const option = this.#optionElements.at(activeOptionIndex + 1);

        if (option) {
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = option.id;
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

        const option = this.#optionElements.at(0);

        if (option) {
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = option.id;
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

        const option = this.#optionElements.at(-1);

        if (option) {
          this.activeOption.privateActive = false;
          this.ariaActivedescendant = option.id;
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

    if (this.#targetElement && this.#optionsElementRef.value) {
      this.#targetElement.ariaHasPopup = 'true';

      this.#targetElement.ariaExpanded =
        this.open && !this.isTargetDisabled ? 'true' : 'false';
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

    if (this.open && this.activeOption) {
      this.ariaActivedescendant = this.activeOption.id;
    } else if (!this.open) {
      this.ariaActivedescendant = '';
      this.focus();
    }
  }

  get #optionElements() {
    return (
      this.#defaultSlotElementRef.value?.assignedElements({ flatten: true }) ??
      []
    ).filter((element): element is GlideCoreMenuLink | GlideCoreMenuButton => {
      return (
        element instanceof GlideCoreMenuLink ||
        element instanceof GlideCoreMenuButton
      );
    });
  }

  #setUpFloatingUi() {
    if (this.#targetElement && this.#optionsElementRef.value) {
      this.#cleanUpFloatingUi = autoUpdate(
        this.#targetElement,
        this.#optionsElementRef.value,
        () => {
          (async () => {
            if (this.#targetElement && this.#optionsElementRef.value) {
              const { x, y, placement } = await computePosition(
                this.#targetElement,
                this.#optionsElementRef.value,
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

              this.#optionsElementRef.value.dataset.placement = placement;

              Object.assign(this.#optionsElementRef.value.style, {
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
