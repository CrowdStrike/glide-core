import './tooltip.js';
import { LitElement, html } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { owSlot } from './library/ow.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal-tertiary-icon': GlideCoreModalTertiaryIcon;
  }
}

/**
 * @description A Modal tertiary icon wrapper.  Provides opinionated styling and accessibility for icons in Modals.
 *  Should be used only in the "tertiary" slot of a Modal.
 *
 * @slot - The icon to be rendered.
 */
@customElement('glide-core-modal-tertiary-icon')
export default class GlideCoreModalTertiaryIcon extends LitElement {
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
      <glide-core-tooltip placement=${this.tooltipPlacement}>
        ${this.label}
        <span tabindex="0" aria-label=${ifDefined(this.label)} slot="target">
          <slot
            @slotchange=${this.#onDefaultSlotChange}
            ${ref(this.#defaultSlotElementRef)}
          ></slot>
        </span>
      </glide-core-tooltip>
    `;
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
