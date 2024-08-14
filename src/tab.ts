import { LitElement, type PropertyValues, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import styles from './tab.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab': GlideCoreTab;
  }
}

/**
 * @description A single tab. Always place inside of a <glide-core-tab-group> component.
 *
 * @slot - Main content (label) for the tab
 *
 * @slot icon - A slot for placing an optional icon for the tab
 *
 */
@customElement('glide-core-tab')
export default class GlideCoreTab extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  /**
   * The name of the panel corresponding to this tab
   */
  @property({ reflect: true }) panel = '';

  /** Sets the active attribute on the tab. */
  @property({ type: Boolean, reflect: true }) active = false;

  /** Disables the tab. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  protected override firstUpdated() {
    this.setAttribute('role', 'tab');

    this.id = this.#id;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        active: this.active,
        disabled: this.disabled,
      })}
    >
      <span class="container">
        <slot name="icon"></slot>
        <div class="default-slot">
          <slot></slot>
        </div>
      </span>
    </div> `;
  }

  protected override updated(changes: PropertyValues) {
    if (changes.has('active')) {
      this.setAttribute('aria-selected', this.active ? 'true' : 'false');
    }

    if (changes.has('disabled')) {
      if (this.disabled) {
        this.setAttribute('aria-disabled', 'true');
        this.setAttribute('tabindex', '-1');
      } else {
        this.removeAttribute('aria-disabled');
      }
    }
  }

  #id = nanoid();
}
