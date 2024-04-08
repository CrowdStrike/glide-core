import { LitElement, html } from 'lit';
// import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group-button': CsButtonGroupButton;
  }
}

@customElement('cs-button-group-button')
export default class CsButtonGroupButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  @property({ type: Boolean, reflect: true })
  get checked() {
    return this.#checked;
  }

  set checked(isChecked) {
    this.#checked = isChecked;
    if (this.#checked) {
      this.#isTabbable = true;
      this.focus();
      for (const button of this.#buttonElements) {
        if (button !== this) {
          button.checked = false;
        }
      }
      this.dispatchEvent(
        new CustomEvent('cs-private-change', { bubbles: true }),
      );
      this.dispatchEvent(
        new CustomEvent('cs-private-input', { bubbles: true }),
      );
    } else {
      this.#isTabbable = false;
    }
  }

  @property()
  value = '';

  override firstUpdated(): void {
    const buttonElements = this.#buttonElements;
    if (buttonElements.length > 0 && this === buttonElements[0]) {
      this.#isTabbable = true;
      this.requestUpdate();
    }
  }

  override focus(options?: FocusOptions) {
    this.#lifRef.value?.focus(options);
  }

  override render() {
    return html`<li
      aria-checked=${this.checked}
      tabindex=${this.#isTabbable ? 0 : -1}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      role="radio"
      ${ref(this.#lifRef)}
    >
      <slot></slot>
    </li>`;
  }

  #checked = false;

  #isTabbable = false;

  #lifRef = createRef<HTMLLIElement>();

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  #onClick() {
    this.checked = true;
  }

  #onKeydown(event: KeyboardEvent) {
    const buttonElements = this.#buttonElements;
    switch (event.key.toLocaleLowerCase()) {
      case 'arrowup':
      case 'arrowleft': {
        this.checked = false;
        const sibling = this.previousElementSibling;
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        } else if (buttonElements.length > 0) {
          const lastButton = buttonElements.at(-1);
          if (lastButton) {
            lastButton.checked = true;
          }
        }
        break;
      }
      case 'arrowdown':
      case 'arrowright': {
        this.checked = false;
        const sibling = this.nextElementSibling;
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        } else if (buttonElements.length > 0) {
          const firstButton = buttonElements.at(0);
          if (firstButton) {
            firstButton.checked = true;
          }
        }
        break;
      }
      case 'space': {
        this.checked = true;
        break;
      }
    }
  }
}
