import './icon-button.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './modal.icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-modal-icon-button': CsModalIconButton;
  }
}

/**
 * @description A Modal Icon Button. Should be used only in the "header-actions" slot of a Modal.
 *
 * @slot - The content of the button. Should only be a cs-icon. The icon should also leverage the
 *         "label" attribute for accessibility so that it is read to screenreaders.
 *
 * @example
 * <cs-modal-icon-button slot="header-actions">
 *   <!-- icon here -->
 * </cs-modal-icon-button>
 */
@customElement('cs-modal-icon-button')
export default class CsModalIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label? = '';

  override render() {
    return html`
      <cs-icon-button label=${this.label} variant="tertiary">
        <slot></slot>
      </cs-icon-button>
    `;
  }
}
