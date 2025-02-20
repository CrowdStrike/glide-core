import './icon-button.js';
import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tree.item.icon-button.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tree-item-icon-button': GlideCoreTreeItemIconButton;
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
@customElement('glide-core-tree-item-icon-button')
@final
export default class GlideCoreTreeItemIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property()
  @required
  label?: string;

  @property({ reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`
      <glide-core-icon-button
        class="component"
        variant="tertiary"
        tabindex="-1"
        label=${ifDefined(this.label)}
      >
        <slot ${assertSlot()}>
          <!-- 
            An icon
            @type {Element}
          -->
        </slot>
      </glide-core-icon-button>
    `;
  }
}
