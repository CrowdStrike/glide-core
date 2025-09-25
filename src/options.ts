import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';
import { range } from 'lit/directives/range.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './options.styles.js';
import final from './library/final.js';
import uniqueId from './library/unique-id.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-options': Options;
  }
}

// This component exists because Menu's target and its menu (`"role="menu"` or
// `role="listbox"`) both need to be in the light DOM so the target and menu can
// reference each other's IDs in ARIA attributes.
//
// Tooltip is in a similar situation but has no default slot. So we can simply take
// the value of its `label` attribute, pass it to Tooltip Container, then dump
// Tooltip Container into Tooltip's light DOM for consumers. We can't do the same
// for Menu because it necessarily has a default slot for Option(s) and arbitrary
// content.
//
// An alternative solution would be to require that consumers wrap their default
// slot content in any element. But doing so would be arguably more awkward than
// asking them to slot an element specifically for the purpose.

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
 * @slot {Element | undefined}
 *
 * @fires {Event} slotchange
 */
@customElement('glide-core-options')
@final
export default class Options extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  // On the host because `role` is on the host.
  @property({
    attribute: 'aria-activedescendant',
    reflect: true,
    useDefault: true,
  })
  ariaActivedescendant = '';

  // On the host because `role` is on the host.
  @property({ attribute: 'aria-labelledby', reflect: true, useDefault: true })
  ariaLabelledby = '';

  // On the host instead so screenreaders can find it when Menu's target references
  // it via `aria-controls`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ type: Boolean })
  privateLoading = false;

  // On the host because otherwise VoiceOver won't recongize it as belonging to
  // Menu's target.
  @property({ reflect: true })
  override role: 'menu' | 'listbox' = 'menu';

  // On the host because `role` is on the host.
  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    // Without `role="none"` VoiceOver doesn't announce how many options are available.
    // Presumably because this element sits between the host (which has `role="menu" or
    // `role="listbox"`) and Option(s) (which have `role="menuitem"` or
    // `role="option"`).
    return html`<div class="component" role="none">
      <slot
        ?hidden=${this.privateLoading}
        @slotchange=${this.#onDefaultSlotChange}
      >
        <!-- @type {Element | undefined} -->
      </slot>

      ${when(this.privateLoading, () => {
        return html`<div class="loading-feedback" data-test="loading-feedback">
          ${map(range(7), () => html`<div></div>`)}
        </div>`;
      })}
    </div>`;
  }

  #onDefaultSlotChange() {
    this.dispatchEvent(new Event('slotchange', { bubbles: true }));
  }
}
