import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit-html/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
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
 *     Information
 *     <cs-modal-tertiary-icon label="Information">
 *       <!-- icon here -->
 *     </cs-modal-tertiary-icon>
 *   </cs-tooltip>
 * </span>
 */
@customElement('cs-modal-tertiary-icon')
export default class CsModalTertiaryIcon extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property()
  label? = '';

  override render() {
    return html`<span
      tabindex="0"
      class=${classMap({ component: true })}
      aria-label=${this.label || nothing}
      ><slot></slot
    ></span>`;
  }
}
