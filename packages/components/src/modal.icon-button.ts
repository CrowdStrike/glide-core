import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
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
  static override styles = styles;

  override render() {
    return html`<button type="button"><slot></slot></button>`;
  }
}
