import './icon-button.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './modal.icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal-icon-button': GlideCoreModalIconButton;
  }
}

/**
 * @attr {string} label
 *
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @slot {Element} - An icon
 */
@customElement('glide-core-modal-icon-button')
@final
export default class GlideCoreModalIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property()
  @required
  label?: string;

  @property({ noAccessor: true, reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`
      <glide-core-icon-button label=${ifDefined(this.label)} variant="tertiary">
        <slot ${assertSlot()}>
          <!-- 
            An icon

            @required
            @type {Element}
          -->
        </slot>
      </glide-core-icon-button>
    `;
  }
}
