import './tooltip.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { owSlot } from './library/ow.js';

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

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <cs-tooltip placement=${this.tooltipPlacement}>
        ${this.label}
        <span tabindex="0" aria-label=${ifDefined(this.label)} slot="target">
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </span>
      </cs-tooltip>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
