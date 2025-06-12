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

// TODO: tweak comment?
// This component exists because Menu's target and its menu both need to be in
// the light DOM so the target's ARIA attributes can be associated with the IDs
// of Menu that they reference.
//
// Tooltip is in a similar situation but has no default slot. So we can simply take
// the value of its `label` attribute, pass it to Tooltip Container, then dump
// Tooltp Container into Tooltip's light DOM for consumers. We can't do the same
// for Menu because it necessarily has a default slot for Menu Buttons and Menu Links.
//
// One alternative solution is to require that consumers wrap their default slot content
// in any element. But doing so would be arguably more awkward than asking them to slot
// an element built for that purpose. It would also beget more questions, adding to our
// support load.

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

  // On the host instead of inside the shadow DOM so screenreaders can find it
  // when Menu's target uses it with `aria-controls`.
  @property({ reflect: true })
  override readonly id: string = uniqueId();

  @property({ type: Boolean })
  privateLoading = false;

  // TODO: say why on host
  @property({ reflect: true })
  override role: 'menu' | 'listbox' = 'menu';

  @property({ attribute: 'tabindex', reflect: true, type: Number })
  override readonly tabIndex = -1;

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  // TODO: say why role="none"
  override render() {
    return html`<div class="component" role="none">
      <slot
        class=${classMap({
          'default-slot': true,
          loading: this.privateLoading,
        })}
        @slotchange=${this.#onSlotChange}
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

  #onSlotChange() {
    this.dispatchEvent(new Event('private-slot-change', { bubbles: true }));
  }
}
