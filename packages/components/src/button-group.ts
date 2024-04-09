import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import CsButtonGroupButton from './button-group-button.js';
import styles from './button-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group': CsButtonGroup;
  }
}

@customElement('cs-button-group')
export default class CsButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label = '';

  @property({ type: Boolean, reflect: true })
  vertical?: false;

  override render() {
    /*  eslint-disable lit-a11y/list */
    return html`
      <ul
        id="button-group"
        role="radiogroup"
        @cs-private-change=${this.#onPrivateChange}
        @cs-private-input=${this.#onPrivateInput}
        aria-label=${this.label}
        class=${classMap({
          vertical: this.vertical ?? false,
        })}
      >
        <slot></slot>
      </ul>
    `;
  }

  #onPrivateChange(event: Event) {
    if (event.target instanceof CsButtonGroupButton && event.target.checked) {
      this.dispatchEvent(
        new CustomEvent('cs-change', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }

  #onPrivateInput(event: Event) {
    if (event.target instanceof CsButtonGroupButton && event.target.checked) {
      this.dispatchEvent(
        new CustomEvent('cs-input', {
          bubbles: true,
          detail: event.target.value,
        }),
      );
    }
  }
}
