import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import styles from './modal.tertiary-icon.styles.js';

/**
 * @description A Modal tertiary icon wrapper.  Provides opinionated styling and accessibility for icons in Modals.
 *  Should be used only in the "tertiary" slot of a Modal with a cs-tooltip component.
 *
 * @slot - The icon to be rendered. Should only be a cs-icon. The icon should also leverage the
 *         "label" attribute for accessibility so that it is read to screenreaders.
 *
 * @example
 * <!-- From within a cs-modal component -->
 * <span slot="tertiary">
 *   <cs-tooltip>
 *     <div slot="description">Information</div>
 *     <cs-modal-icon-tooltip>
 *       <!-- icon here -->
 *     </cs-modal-icon-tooltip>
 *   </cs-tooltip>
 * </span>
 */
@customElement('cs-modal-tertiary-icon')
export default class CsModalTertiaryIcon extends LitElement {
  static override styles = styles;

  override render() {
    return html`<span tabindex="0"><slot></slot></span>`;
  }
}
