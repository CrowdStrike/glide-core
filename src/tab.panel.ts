import { LitElement, type PropertyValues, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import styles from './tab.panel.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-panel': GlideCoreTabPanel;
  }
}

/**
 * @slot - Main content for the tab panel
 */
@customElement('glide-core-tab-panel')
export default class GlideCoreTabPanel extends LitElement {
  static instanceCount = 0;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  /**
   * The name of this panel
   * The corresponding <glide-core-tab> will have a `panel` attribute with this name
   */
  @property({ reflect: true }) name = '';

  @property({ type: Boolean }) isSelected = true;

  protected override firstUpdated() {
    this.setAttribute('role', 'tabpanel');

    this.id = this.#id;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        hidden: !this.isSelected,
        selected: this.isSelected,
      })}
      data-test="tab-panel"
    >
      <slot></slot>
    </div>`;
  }

  protected override updated(changes: PropertyValues) {
    super.updated(changes);

    if (changes.has('isSelected')) {
      this.setAttribute('aria-hidden', this.isSelected ? 'false' : 'true');
    }
  }

  #id = nanoid();
}
