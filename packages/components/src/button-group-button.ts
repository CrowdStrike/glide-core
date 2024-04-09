import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './button-group-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group-button': CsButtonGroupButton;
  }
}

type TButtonGroupButtonPosition = 'first' | 'last' | 'inner';

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

  @property({ type: Boolean, reflect: true })
  disabled? = false;

  @property({ reflect: true })
  value = '';

  @state()
  isTabbable = false;

  @state()
  position: TButtonGroupButtonPosition = 'inner';

  @state()
  vertical = false;

  override connectedCallback(): void {
    super.connectedCallback();

    const buttonGroupElement = this.closest('cs-button-group');
    if (buttonGroupElement) {
      this.#observer = new MutationObserver(this.#mutationCallback);
      this.#observer.observe(buttonGroupElement, { attributes: true });
    }
    if (buttonGroupElement?.hasAttribute('vertical')) {
      this.vertical = true;
    }

    const buttonElements = this.#buttonElements;
    if (buttonElements.every((button) => button.disabled)) {
      return;
    }
    if (buttonElements.length > 0) {
      if (buttonElements.at(0) === this) {
        this.position = 'first';
      } else if (buttonElements.at(-1) === this) {
        this.position = 'last';
      }

      // set tabbable if it is the first checked enabled element or the
      // first enabled element
      const firstEnabledCheckedButton = buttonElements.find(
        (button) => !button.disabled && button.checked,
      );
      if (firstEnabledCheckedButton && firstEnabledCheckedButton === this) {
        this.isTabbable = true;
      } else {
        const firstEnabledButton = buttonElements.find(
          (button) => !button.disabled,
        );
        if (firstEnabledButton && firstEnabledButton === this) {
          this.isTabbable = true;
        }
      }
    }
  }

  override disconnectedCallback() {
    this.#observer?.disconnect();
  }

  override focus(options?: FocusOptions) {
    this.#lifRef.value?.focus(options);
  }

  override render() {
    return html`<li
      role="radio"
      aria-checked=${this.checked}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @mousedown=${this.#onMousedown}
      @keydown=${this.#onKeydown}
      ${ref(this.#lifRef)}
      class=${classMap({
        checked: this.checked,
        disabled: this.disabled ?? false,
        [this.position]: true,
        vertical: this.vertical,
      })}
      aria-label=${this.ariaLabel ?? ''}
    >
      <slot name="prefix"></slot>
      <slot></slot>
    </li>`;
  }

  #checked = false;

  #lifRef = createRef<HTMLLIElement>();

  #observer: MutationObserver | null = null;

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  // use an arrow function to bind this
  #mutationCallback = (mutationList: MutationRecord[]) => {
    for (const mutation of mutationList) {
      const { type, attributeName } = mutation;
      if (type === 'attributes' && attributeName === 'vertical') {
        this.vertical = !this.vertical;
      }
    }
  };

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

  #onMousedown() {
    if (!this.disabled) {
      this.checked = true;
    }
  }
}
