import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tab.panel.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-panel': GlideCoreTabPanel;
  }
}

/**
 * @slot - The content of the panel.
 */
@customElement('glide-core-tab-panel')
@final
export default class GlideCoreTabPanel extends LitElement {
  static instanceCount = 0;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * The name of this panel
   * The corresponding <glide-core-tab> will have a `panel` attribute with this name
   */
  @property({ reflect: true })
  @required
  name?: string;

  // Private because it's only meant to be used by Tab Group.
  @property({ type: Boolean }) get privateIsSelected() {
    return this.#isSelected;
  }

  set privateIsSelected(isSelected: boolean) {
    this.setAttribute('aria-hidden', isSelected ? 'false' : 'true');
    this.#isSelected = isSelected;
  }

  @property({ reflect: true })
  readonly version = packageJson.version;

  protected override firstUpdated() {
    this.setAttribute('role', 'tabpanel');
    this.id = this.#id;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        hidden: !this.privateIsSelected,
        selected: this.privateIsSelected,
      })}
      data-test="tab-panel"
    >
      <slot></slot>
    </div>`;
  }

  #id = nanoid();

  #isSelected = false;
}
