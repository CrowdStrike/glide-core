import { html, LitElement } from 'lit';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreTooltip from './tooltip.js';
import assertSlot from './library/assert-slot.js';

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

  override render() {
    return html`
      <glide-core-tooltip
        label=${ifDefined(this.label)}
        placement=${this.tooltipPlacement}
        screenreader-hidden
        ${ref(this.#tooltipElementRef)}
      >
        <button aria-label=${ifDefined(this.label)} slot="target">
          <slot ${assertSlot()}></slot>
        </button>
      </glide-core-tooltip>
    `;
  }

  #tooltipElementRef = createRef<GlideCoreTooltip>();
}
