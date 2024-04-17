import { LitElement, type PropertyValues, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './tab-panel.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tab-panel': CsTabPanel;
  }
}

/**
 * @description A single tab panel, associated with a `<cs-tab>`.
 *
 * @slot - Main content for the tab panel
 *
 */
@customElement('cs-tab-panel')
export default class CsTabPanel extends LitElement {
  static instanceCount = 0;

  static override styles = styles;

  /**
   * The name of this panel
   * The corresponding <cs-tab> will have a `panel` attribute with this name
   */
  @property({ reflect: true }) name = '';

  @property({ type: Boolean }) isActive = true;

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'tabpanel');
    if (!this.hasAttribute('id')) {
      this.id = `cs-tab-panel-${CsTabPanel.instanceCount++}`;
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        'tab-panel': true,
        hidden: !this.isActive,
      })}
    >
      <slot></slot>
    </div>`;
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('isActive')) {
      this.setAttribute('aria-hidden', this.isActive ? 'false' : 'true');
    }
  }
}
