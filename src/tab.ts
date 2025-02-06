import { html, LitElement, type PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import styles from './tab.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-tab': GlideCoreTab;
  }
}

/**
 * @attr {string} panel
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {0.19.1} [version]
 *
 * @slot {Element | string} - A label
 * @slot {Element} [icon]
 *
 * @fire {Event} selected
 */
@customElement('glide-core-tab')
@final
export default class GlideCoreTab extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  panel?: string;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get selected(): boolean {
    return this.#isSelected;
  }

  set selected(isSelected: boolean) {
    const hasChanged = isSelected !== this.#isSelected;
    this.#isSelected = isSelected;

    if (isSelected && hasChanged) {
      this.dispatchEvent(
        new Event('selected', {
          bubbles: true,
          composed: true,
        }),
      );
    }
  }

  @property({ noAccessor: true, reflect: true })
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
        <slot name="icon">
          <!-- 
            @type {Element}
          -->
        </slot>

        <slot>
          <!-- 
            A label 
            @type {Element | string} 
          -->
        </slot>
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

  #isSelected = false;
}
