import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import styles from './button-group.button.styles.js';
import type { TButtonGroupVariant } from './button-group.js';

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

  @property()
  label? = '';

  @property({ type: Boolean, reflect: true })
  get selected() {
    return this.#selected;
  }

  set selected(isSelected) {
    this.#selected = isSelected;
    if (this.#selected) {
      // when selected, set the element as tabbable and focus
      this.isTabbable = true;
      this.focus();
      // set other elements as not selected
      const buttonElements = this.#buttonElements;
      for (const button of buttonElements) {
        if (button !== this && button.selected) {
          button.selected = false;
        }
      }
      this.dispatchEvent(new Event('change', { bubbles: true }));
      this.dispatchEvent(new Event('input', { bubbles: true }));
    } else {
      this.isTabbable = false;
    }
  }

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ reflect: true })
  value = '';

  @property()
  variant?: TButtonGroupVariant;

  @property({ type: Boolean })
  vertical = false;

  override async connectedCallback() {
    super.connectedCallback();

    // determine position in group and style approriately
    const buttonElements = this.#buttonElements;
    if (buttonElements.length > 0) {
      if (buttonElements.length > 1 && buttonElements.at(0) === this) {
        this.position = 'first';
      } else if (buttonElements.length > 1 && buttonElements.at(-1) === this) {
        this.position = 'last';
      } else if (buttonElements.length === 1) {
        this.isSingleButton = true;
      }

      // do not set any button as tabbable if all are disabled
      if (buttonElements.every((button) => button.disabled)) {
        return;
      }

      // set tabbable if this is the first selected enabled element or the
      // first enabled element
      const firstEnabledSelectedButton = buttonElements.find(
        (button) => !button.disabled && button.selected,
      );
      if (firstEnabledSelectedButton && firstEnabledSelectedButton === this) {
        this.isTabbable = true;
      } else if (!firstEnabledSelectedButton) {
        const firstEnabledButton = buttonElements.find(
          (button) => !button.disabled,
        );
        if (firstEnabledButton && firstEnabledButton === this) {
          this.isTabbable = true;
        }
      }
    }
  }

  override focus(options?: FocusOptions) {
    this.#liRef.value?.focus(options);
  }

  override render() {
    return html` <li
      role="radio"
      aria-checked=${this.selected}
      aria-disabled=${this.disabled}
      tabindex=${!this.isTabbable || this.disabled ? -1 : 0}
      @click=${this.#onClick}
      @keydown=${this.#onKeydown}
      ${ref(this.#liRef)}
      class=${classMap({
        selected: this.selected,
        disabled: Boolean(this.disabled),
        [this.position]: true,
        vertical: this.vertical,
        single: this.isSingleButton,
        'icon-only': this.variant === 'icon-only',
      })}
      variant=${this.variant}
      aria-label=${this.variant === 'icon-only' ? this.label : nothing}
    >
      <slot name="prefix" ${ref(this.#prefixSlotRef)}></slot>
      <slot ${ref(this.#defaultSlotRef)}></slot>
    </li>`;
  }

  @state()
  private isSingleButton = false;

  @state()
  private isTabbable = false;

  @state()
  private position: 'first' | 'last' | 'inner' = 'inner';

  #defaultSlotRef = createRef<HTMLSlotElement>();

  #liRef = createRef<HTMLLIElement>();

  #prefixSlotRef = createRef<HTMLSlotElement>();

  #selected = false;

  get #buttonElements() {
    const elements =
      this.closest('cs-button-group')?.querySelectorAll(
        'cs-button-group-button',
      ) ?? [];
    return [...elements];
  }

  #onClick() {
    if (!this.disabled && !this.selected) {
      this.selected = true;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    const buttonElements = this.#buttonElements;
    if (buttonElements.length < 2 && event.key !== ' ') {
      return;
    }
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowLeft': {
        event.preventDefault();
        this.selected = false;
        // find the closest enabled button
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
          sibling.selected = true;
        }
        break;
      }
      case 'ArrowDown':
      case 'ArrowRight': {
        event.preventDefault();
        this.selected = false;
        // find the closest enabled button
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
          sibling.selected = true;
        }
        break;
      }
      case ' ': {
        event.preventDefault();
        if (!this.disabled && !this.selected) {
          this.selected = true;
        }
        break;
      }
    }
  }
}
