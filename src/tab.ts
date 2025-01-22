import { html, LitElement, type PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tab.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab': GlideCoreTab;
  }
}

/**
 * @event selected
 *
 * @slot - A label.
 * @slot icon - An optional icon.
 */
@customElement('glide-core-tab')
export default class GlideCoreTab extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true }) panel = '';

  @property({ type: Boolean, reflect: true }) disabled = false;

  @property({ type: Boolean, reflect: true }) selected = false;

  @property({ reflect: true })
  readonly version = packageJson.version;

  protected override firstUpdated() {
    this.setAttribute('role', 'tab');
    this.id = this.#id;
  }

  override render() {
    return html`<div
      class=${classMap({
        component: true,
        disabled: this.disabled,
      })}
    >
      <div class="container">
        <slot name="icon"></slot>
        <div class="default-slot">
          <slot></slot>
        </div>
      </div>
    </div> `;
  }

  protected override updated(changes: PropertyValues) {
    if (changes.has('selected')) {
      this.setAttribute('aria-selected', this.selected ? 'true' : 'false');
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
