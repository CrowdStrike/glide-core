import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { range } from 'lit/directives/range.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './options.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-options': Options;
  }
}

// This component exists because Menu's target and its menu both need to be in
// the light DOM so the target andthe menu can reference each other's IDs via ARIA
// attributes.

/**
 * @attr {string} [aria-activedescendant='']
 * @attr {string} [aria-labelledby='']
 *
 * @readonly
 * @attr {string} [id]
 *
 * @attr {'menu'|'listbox'} [role='menu']
 *
 * @readonly
 * @attr {number} [tabindex=-1]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element}
 */
@customElement('glide-core-options')
@final
export default class Options extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({
    attribute: 'aria-activedescendant',
    reflect: true,
    useDefault: true,
  })
  ariaActivedescendant = '';

  @property({ attribute: 'aria-labelledby', reflect: true, useDefault: true })
  ariaLabelledby = '';

  // On the host instead of inside the shadow root so screenreaders can find the
  // Id when Menu's target uses it with `aria-controls`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ type: Boolean })
  privateLoading = false;

  @property({ reflect: true })
  override role: 'menu' | 'listbox' = 'menu';

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    // Without `role="none" VoiceOver doesn't announce how many options are available.
    return html`<div class="component" role="none">
      <slot
        class=${classMap({
          'default-slot': true,
          loading: this.privateLoading,
        })}
        @slotchange=${this.#onDefaultSlotChange}
      >
        <!-- @type {Element} -->
      </slot>

      ${when(this.privateLoading, () => {
        return html`<div class="loading-feedback" data-test="loading-feedback">
          ${map(range(7), () => html`<div></div>`)}
        </div>`;
      })}
    </div>`;
  }

  #onDefaultSlotChange() {
    this.dispatchEvent(new Event('private-slot-change', { bubbles: true }));
  }
}
