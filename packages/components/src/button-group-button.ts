import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './button-group-button.styles.js';

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

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  get checked() {
    return this.#checked;
  }

  set checked(isChecked) {
    this.#checked = isChecked;
    if (this.#checked) {
      this.isTabbable = true;
      this.focus();
      const buttonElements = this.#buttonElements;
      for (const button of buttonElements) {
        if (button !== this) {
          button.checked = false;
          button.isTabbable = false;
        }
      }
      this.dispatchEvent(
        new CustomEvent('cs-private-change', { bubbles: true }),
      );
      this.dispatchEvent(
        new CustomEvent('cs-private-input', { bubbles: true }),
      );
    } else {
      this.isTabbable = false;
    }
  }

  @property({ type: Boolean })
  disabled? = false;

  @property()
  value = '';

  @state()
  isTabbable = false;

  override connectedCallback(): void {
    super.connectedCallback();
    const buttonElements = this.#buttonElements;
    if (buttonElements.some((button) => button.checked)) {
      return;
    }
    if (buttonElements.length > 0 && this === buttonElements[0]) {
      this.isTabbable = true;
    }
  }

  override focus(options?: FocusOptions) {
    this.#lifRef.value?.focus(options);
  }

  override render() {
    return html`<li
      role="radio"
      aria-checked=${this.checked}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#lifRef)}
      class=${classMap({
        checked: this.checked,
        disabled: this.disabled ?? false,
      })}
      ?disabled=${this.disabled || nothing}
    >
      <slot name="prefix"></slot>
      <slot></slot>
    </li>`;
  }

  #checked = false;

  #lifRef = createRef<HTMLLIElement>();

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  #onClick() {
    if (!this.disabled) {
      this.checked = true;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    const buttonElements = this.#buttonElements;
    switch (event.key.toLocaleLowerCase()) {
      case 'arrowup':
      case 'arrowleft': {
        this.checked = false;
        let sibling = this.previousElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const lastButton = buttonElements.at(-1);
            if (lastButton) {
              sibling = lastButton;
            }
          } else {
            sibling = sibling.previousElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        }
        break;
      }
      case 'arrowdown':
      case 'arrowright': {
        this.checked = false;
        let sibling = this.nextElementSibling;
        while (
          !sibling ||
          (sibling instanceof CsButtonGroupButton && sibling.disabled)
        ) {
          if (sibling === null) {
            const firstButton = buttonElements.at(0);
            if (firstButton) {
              sibling = firstButton;
            }
          } else {
            sibling = sibling.nextElementSibling;
          }
        }
        if (sibling && sibling instanceof CsButtonGroupButton) {
          sibling.checked = true;
        }
        break;
      }
      case 'space': {
        if (!this.disabled) {
          this.checked = true;
        }
        break;
      }
    }
  }
}
