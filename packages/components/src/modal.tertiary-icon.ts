import './tooltip.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';

/**
 * @description A Modal tertiary icon wrapper.  Provides opinionated styling and accessibility for icons in Modals.
 *  Should be used only in the "tertiary" slot of a Modal.
 *
 * @slot - The icon to be rendered.
 */
@customElement('cs-modal-tertiary-icon')
export default class CsModalTertiaryIcon extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  @property()
  label?: string;

  @property({ attribute: 'tooltip-placement' })
  tooltipPlacement: 'bottom' | 'left' | 'right' | 'top' = 'bottom';

  override render() {
    return html`
      <cs-tooltip placement=${this.tooltipPlacement}>
        ${this.label}
        <span tabindex="0" aria-label=${ifDefined(this.label)} slot="target">
          <slot></slot>
        </span>
      </cs-tooltip>
    `;
  }
}
