import './menu.component.js';
import '@crowdstrike/glide-icons/arrows/chevron-down/line.js';
import { LitElement, html } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import MenuButton from './button.js';
import MenuLink from './link.js';
import styles from './menu.styles.js';

/**
 * @description A custom-built menu.
 *
 * @slot target - A focusable element against which Menu will be positioned. Opens and closes Menu when interacted with.
 * @slot - One or more of <cs-menu-link> or <cs-menu-button>.
 */
@customElement('cs-menu')
export default class Menu extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  get open() {
    return this.#isOpen;
  }

  set open(isOpen) {
    this.#isOpen = isOpen;

    if (this.#targetElement) {
      this.#targetElement.ariaExpanded = isOpen ? 'true' : 'false';
    }
  }

  @property({ reflect: true })
  label?: string;

  @property({ reflect: true })
  size: 'small' | 'large' = 'large';

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

  override disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.#onDocumentClick, {
      capture: true,
    });
  }

  override firstUpdated() {
    const firstOption = this.#optionElements.at(0);

    if (firstOption) {
      firstOption.privateActive = true;
    }

    if (!this.#targetElement || !this.#optionsElement.value) {
      return;
    }

    this.#targetElement.ariaHasPopup = 'true';
    this.#targetElement.ariaExpanded = this.open ? 'true' : 'false';

    autoUpdate(this.#targetElement, this.#optionsElement.value, async () => {
      if (this.#targetElement && this.#optionsElement.value) {
        const { x, y } = await computePosition(
          this.#targetElement,
          this.#optionsElement.value,
          {
            placement: 'bottom-start',
            middleware: [
              offset({
                mainAxis:
                  Number.parseFloat(
                    window
                      .getComputedStyle(document.body)
                      .getPropertyValue('--cs-spacing-xxs'),
                  ) * 16,
              }),
              flip(),
            ],
          },
        );

        Object.assign(this.#optionsElement.value.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
      }
    });
  }

  override focus() {
    const target = this.#targetSlotElement.value?.assignedElements().at(0);

    if (target && 'focus' in target) {
      (target as { focus: () => void })?.focus();
    }
  }

  override render() {
    // The linter checks that all ULs have LIs as children. It doesn't account for
    // slots, which can contain LIs. The linter also wants a focus listener on the
    // slot, but there's nothing to be done with one in this case.
    /*  eslint-disable lit-a11y/list, lit-a11y/mouse-events-have-key-events */
    return html`<div class="component">
      <div
        @focusout=${this.#onTargetAndOptionsFocusout}
        @keydown=${this.#onTargetAndOptionsKeydown}
        ${ref(this.#componentElement)}
      >
        <div
          class="target-container"
          @click=${this.#onTargetContainerClick}
          @keydown=${this.#onTargetContainerKeydown}
          id="target-container"
        >
          <slot name="target" ${ref(this.#targetSlotElement)}></slot>
        </div>

        <div
          aria-labelledby="target-container"
          class=${classMap({
            options: true,
            'options--large': this.size === 'large',
            'options--small': this.size === 'small',
            'options--visible': this.open,
          })}
          role="menu"
          ${ref(this.#optionsElement)}
        >
          <slot
            @click=${this.#onOptionsClick}
            @keydown=${this.#onOptionsKeydown}
            @mouseover=${this.#onOptionsMouseover}
            ${ref(this.#defaultSlotElement)}
          ></slot>
        </div>
      </div>
    </div>`;
  }

  #componentElement = createRef<HTMLDivElement>();

  #defaultSlotElement = createRef<HTMLSlotElement>();

  #isOpen = false;

  #optionsElement = createRef<HTMLUListElement>();

  #targetSlotElement = createRef<HTMLSlotElement>();

  // set to the component instead of `document`.
  #onDocumentClick = (event: MouseEvent) => {
    if (event.target && this.contains(event.target as Node)) {
      return;
    }

    this.open = false;
  };

  async #focusActiveOrFirstOption() {
    const option =
      this.#optionElements.find((element) => element.privateActive) ??
      this.#optionElements.at(0);

    if (option) {
      // Wait until the options are visible before trying to focus one.
      await this.updateComplete;

      option.focus();
    }
  }

  // An arrow function field instead of a method so `this` is closed over and

  get #optionElements() {
    const buttons = this.querySelectorAll('cs-menu-button') ?? [];
    const links = this.querySelectorAll('cs-menu-link') ?? [];
    return [...buttons, ...links];
  }

  #onOptionsClick() {
    this.open = false;
  }

  #onOptionsKeydown(event: KeyboardEvent) {
    if ([' ', 'Enter'].includes(event.key)) {
      this.open = false;
      this.focus();
      return;
    }

    const activeOptionIndex = this.#optionElements.findIndex(
      (element) => element.privateActive,
    );
    const activeOption = this.#optionElements.at(activeOptionIndex);

    if (!activeOption) {
      return;
    }

    // All the logic below could just as well go in a `@keydown` in Button and Link.
    // It's here to mirror the tests, which necessarily test against Menu as a whole
    // because more than one Button or Link is required to test these interactions.
    if (event.key === 'ArrowUp' && !event.metaKey) {
      event.preventDefault(); // Prevent scroll.
      const option = this.#optionElements.at(activeOptionIndex - 1);

      if (option && activeOptionIndex !== 0) {
        activeOption.privateActive = false;
        option.privateActive = true;
        option.focus();
      }

      return;
    }

    if (event.key === 'ArrowDown' && !event.metaKey) {
      event.preventDefault(); // Prevent scroll.
      const option = this.#optionElements.at(activeOptionIndex + 1);

      if (option) {
        activeOption.privateActive = false;
        option.privateActive = true;
        option.focus();
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
        activeOption.privateActive = false;
        option.privateActive = true;
        option.focus();
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
        activeOption.privateActive = false;
        option.privateActive = true;
        option.focus();
      }

      return;
    }
  }

  #onOptionsMouseover(event: Event) {
    if (
      event.target instanceof MenuLink ||
      event.target instanceof MenuButton
    ) {
      for (const option of this.#optionElements) {
        option.privateActive = option === event.target;
      }

      event.target.focus();
    }
  }

  #onTargetAndOptionsFocusout() {
    // `document.body` receives focus immediately after focus is moved. So we
    // wait a frame to see where focus ultimately landed.
    setTimeout(() => {
      if (!this.contains(document.activeElement)) {
        this.open = false;
      }
    });
  }

  #onTargetAndOptionsKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;
      this.focus();
    }
  }

  async #onTargetContainerClick() {
    if (this.#targetElement instanceof HTMLElement) {
      this.#targetElement.ariaExpanded = this.open ? 'true' : 'false';
    }

    this.open = !this.open;

    if (this.open) {
      this.#focusActiveOrFirstOption();
    } else {
      this.focus();
    }
  }

  #onTargetContainerKeydown(event: KeyboardEvent) {
    if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault(); // Prevent scroll.
      this.open = true;

      if (this.open) {
        this.#focusActiveOrFirstOption();
      } else {
        this.focus();
      }
    }
  }

  get #targetElement() {
    return this.#targetSlotElement.value?.assignedElements().at(0);
  }
}
