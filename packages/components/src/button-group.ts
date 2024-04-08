import { LitElement, html } from 'lit';
// import { classMap } from 'lit/directives/class-map.js';
// import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import CsButtonGroupButton from './button-group-button.js';
import styles from './button-group.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-button-group': CsButtonGroup;
  }
}

export type TButtonGroupOrientation = 'horizontal' | 'vertical';

@customElement('cs-button-group')
export default class CsButtonGroup extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label = '';

  @property({ reflect: true })
  orientation: TButtonGroupOrientation = 'horizontal';

  @property()
  disabled = false;

  override render() {
    /*  eslint-disable lit-a11y/list */
    return html`
      <ul
        id="button-group"
        role="radiogroup"
        @cs-private-change=${this.#onPrivateChange}
        @cs-private-input=${this.#onPrivateInput}
        aria-label=${this.label}
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
