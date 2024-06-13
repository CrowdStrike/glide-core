import { LitElement, type PropertyValues, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './tab.panel.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab-panel': GlideCoreTabPanel;
  }
}

/**
 * @description A single tab panel, associated with a `<glide-core-tab>`.
 *
 * @slot - Main content for the tab panel
 *
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

  @property({ type: Boolean }) isActive = true;

  protected override firstUpdated() {
    this.setAttribute('role', 'tabpanel');

    if (!this.hasAttribute('id')) {
      this.id = `glide-core-tab-panel-${GlideCoreTabPanel.instanceCount++}`;
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        hidden: !this.isActive,
      })}
    >
      <slot></slot>
    </div>`;
  }

  protected override updated(changes: PropertyValues) {
    super.updated(changes);

    if (changes.has('isActive')) {
      this.setAttribute('aria-hidden', this.isActive ? 'false' : 'true');
    }
  }
}
