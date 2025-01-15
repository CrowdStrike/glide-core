import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreTooltip from './tooltip.js';
import { owSlot } from './library/ow.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal-tertiary-icon': GlideCoreModalTertiaryIcon;
  }
}

/**
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

  @property({ reflect: true })
  readonly version = packageJson.version;

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
  }

  override render() {
    return html`
      <glide-core-tooltip
        placement=${this.tooltipPlacement}
        ${ref(this.#tooltipElementRef)}
      >
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

  #tooltipElementRef = createRef<GlideCoreTooltip>();

  #onDefaultSlotChange() {
    owSlot(this.#defaultSlotElementRef.value);
  }
}
