import { LitElement, html } from 'lit';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
import CsMenuButton from './menu-button.js';
import CsMenuLink from './menu-link.js';
import styles from './menu.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-menu': CsMenu;
  }
}

/**
 * @description A custom-built menu.
 *
 * @slot - One or more of <cs-menu-link> or <cs-menu-button>.
 * @slot target - A focusable element against which Menu will be positioned. Opens and closes Menu when interacted with.
 */
@customElement('cs-menu')
export default class CsMenu extends LitElement {
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
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [CsMenuButton, CsMenuLink]);
    owSlot(this.#targetSlotElementRef.value);

    const firstOption = this.#optionElements.at(0);

    if (firstOption) {
      firstOption.privateActive = true;
    }

    if (this.#targetElement && this.#optionsElementRef.value) {
      this.#targetElement.ariaHasPopup = 'true';
      this.#targetElement.ariaExpanded = this.open ? 'true' : 'false';

      autoUpdate(
        this.#targetElement,
        this.#optionsElementRef.value,
        async () => {
          if (this.#targetElement && this.#optionsElementRef.value) {
            const { x, y } = await computePosition(
              this.#targetElement,
              this.#optionsElementRef.value,
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

            Object.assign(this.#optionsElementRef.value.style, {
              left: `${x}px`,
              top: `${y}px`,
            });
          }
        },
      );
    }
  }

  override focus() {
    const target = this.#targetSlotElementRef.value?.assignedElements().at(0);

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
        ${ref(this.#componentElementRef)}
      >
        <div
          class="target-container"
          @click=${this.#onTargetContainerClick}
          @keydown=${this.#onTargetContainerKeydown}
          id="target-container"
        >
          <slot name="target" ${ref(this.#targetSlotElementRef)}></slot>
        </div>

        <div
          aria-labelledby="target-container"
          class=${classMap({
            options: true,
            'options-large': this.size === 'large',
            'options-small': this.size === 'small',
            'options-visible': this.open,
          })}
          role="menu"
          ${ref(this.#optionsElementRef)}
        >
          <slot
            @click=${this.#onOptionsClick}
            @keydown=${this.#onOptionsKeydown}
            @mouseover=${this.#onOptionsMouseover}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </div>
      </div>
    </div>`;
  }

  #componentElementRef = createRef<HTMLDivElement>();

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #isOpen = false;

  #optionsElementRef = createRef<HTMLUListElement>();

  #targetSlotElementRef = createRef<HTMLSlotElement>();

  // An arrow function field instead of a method so `this` is closed over and
  #onDocumentClick = (event: MouseEvent) => {
    if (event.target && this.contains(event.target as Node)) {
      return;
    }

    this.open = false;
  };

  async #focusActiveOption() {
    const option = this.#optionElements.find(
      (element) => element.privateActive,
    );

    if (option) {
      // Wait until the options are visible before trying to focus one.
      await this.updateComplete;

      option.focus();
    }
  }

  get #optionElements() {
    const buttons: NodeListOf<CsMenuButton> =
      this.querySelectorAll('cs-menu-button');

    const links: NodeListOf<CsMenuLink> = this.querySelectorAll('cs-menu-link');

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

    if (activeOption) {
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
  }

  #onOptionsMouseover(event: Event) {
    if (
      event.target instanceof CsMenuLink ||
      event.target instanceof CsMenuButton
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

  #onTargetContainerClick() {
    if (this.#targetElement instanceof HTMLElement) {
      this.#targetElement.ariaExpanded = this.open ? 'true' : 'false';
    }

    this.open = !this.open;

    if (this.open) {
      this.#focusActiveOption();
    } else {
      this.focus();
    }
  }

  #onTargetContainerKeydown(event: KeyboardEvent) {
    if ([' ', 'ArrowUp', 'ArrowDown'].includes(event.key)) {
      event.preventDefault(); // Prevent scroll.

      this.open = true;
      this.#focusActiveOption();
    }
  }

  get #targetElement() {
    return this.#targetSlotElementRef.value?.assignedElements().at(0);
  }
}
