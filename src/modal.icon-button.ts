import './icon-button.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './modal.icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-modal-icon-button': GlideCoreModalIconButton;
  }
}

/**
 * @slot - The content of the button. Should only be an icon. The icon should also use the
 *         "label" attribute for accessibility.
 */
@customElement('glide-core-modal-icon-button')
export default class GlideCoreModalIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property()
  label? = '';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`
      <glide-core-icon-button label=${ifDefined(this.label)} variant="tertiary">
        <slot ${assertSlot()}></slot>
      </glide-core-icon-button>
    `;
  }
}
