import './icon-button.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tree.item.icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-icon-button': GlideCoreTreeItemIconButton;
  }
}

/**
 * @slot - An icon.
 */
@customElement('glide-core-tree-item-icon-button')
export default class GlideCoreTreeItemIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property()
  label = '';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`
      <glide-core-icon-button
        class="component"
        variant="tertiary"
        tabindex="-1"
        label=${this.label}
      >
        <slot ${assertSlot()}></slot>
      </glide-core-icon-button>
    `;
  }
}
