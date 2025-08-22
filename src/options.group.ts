import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './options.group.styles.js';
import Option from './option.js';
import packageJson from '@/package.json' with { type: 'json' };
import final from '@/src/library/final.js';
import assertSlot from '@/src/library/assert-slot.js';
import required from '@/src/library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-options-group': OptionsGroup;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [hide-label=false]
 * @attr {'group'|'optgroup'} [role='group']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Option}
 */
@customElement('glide-core-options-group')
@final
export default class OptionsGroup extends LitElement {
    /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
    return this.#label;
  }

  set label(label: string) {
    this.#label = label;
    this.ariaLabel = label;
  }

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  override role: 'group' | 'optgroup' = 'group';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    return html`
      <div class="component">
        <div
          aria-hidden="true"
          class=${classMap({ label: true, 'visually-hidden': this.hideLabel })}
        >
          ${this.label}
        </div>

        <slot ${assertSlot([Option])}>
          <!-- @type {Option} -->
        </slot>
      </div>
    `;
  }

  #label?: string;
}
