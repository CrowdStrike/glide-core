import { LitElement, type PropertyValues, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './tab.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-tab': CsTab;
  }
}

/**
 * @description A single tab. Always place inside of a <cs-tab-group> component.
 *
 * @slot - Main content (label) for the tab
 *
 * @slot icon - A slot for placing an optional icon for the tab
 *
 */
@customElement('cs-tab')
export default class CsTab extends LitElement {
  static instanceCount = 0;

  static override styles = styles;

  /**
   * The name of the panel corresponding to this tab
   */
  @property({ reflect: true }) panel = '';

  /** Sets the active attribute on the tab. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Sets the variant attribute on the tab. */
  @property({ reflect: true }) variant = 'primary';

  /** Disables the tab. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected override firstUpdated(changes: PropertyValues): void {
    super.firstUpdated(changes);
    this.setAttribute('role', 'tab');
    if (!this.hasAttribute('id')) {
      this.id = `cs-tab-${CsTab.instanceCount++}`;
    }
  }

  override render() {
    return html`<div
      class=${classMap({
        tab: true,
        primary: this.variant === 'primary',
        secondary: this.variant === 'secondary',
        vertical: this.variant === 'vertical',
        active: this.active,
        disabled: this.disabled,
      })}
    >
      <slot name="icon"></slot>
      <div class="default-slot">
        <slot></slot>
      </div>
    </div> `;
  }

  protected override updated(changes: PropertyValues): void {
    super.updated(changes);
    if (changes.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
    }
    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
        this.setAttribute('tabindex', '-1');
      } else {
        this.removeAttribute('aria-disabled');
        this.setAttribute('tabindex', '0');
      }
    }
  }
}
