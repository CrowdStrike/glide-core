import './icon-button.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import Toasts from './toast.toasts.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
import Link from './link.js';
import assertSlot from './library/assert-slot.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toast': Toast;
  }
}

/**
 * @attr {string} label
 * @attr {number} [duration=5000] - Set to `Infinity` to make it persist until dismissed by the user
 * @attr {'informational'|'success'|'error'} [variant='informational']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Link | string} - A description
 *
 * @fires {Event} dismiss
 *
 * @method dismiss
 */
@customElement('glide-core-toast')
@final
export default class Toast extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  @property({ reflect: true })
  @required
  label?: string;

  @property()
  privateDescription?: string;

  /**
   * Set to `Infinity` to make it persist until dismissed by the user
   **/
  @property({ reflect: true, type: Number, useDefault: true })
  duration = 5000;

  @property({ type: Boolean })
  privateDismissing = false;

  @property({ type: Boolean })
  privateDismissingViaButton = false;

  // `privateId` instead of `id` so consumers can specify their own `id` to determine,
  // via `event.target.id`, which Toast was dismissed and then update whatever data
  // structure they're using to render Toasts.
  @property()
  privateId = nanoid();

  @property({ type: Boolean })
  privateShow = false;

  @property({ attribute: false })
  privateTimeoutId?: ReturnType<typeof setTimeout>;

  @property({ reflect: true, useDefault: true })
  variant: 'informational' | 'success' | 'error' = 'informational';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  dismiss(): void {
    this.dispatchEvent(new Event('dismiss', { bubbles: true, composed: true }));

    // It's a tough call whether we should remove Toast for the consumers or ask
    // them should remove it themselves. It's never ideal to manipulate a consumer's
    // DOM. But a stale element on the page is likely to cause confusion given some
    // consumers are unlikely to remove it, whether they know they should or not.
    // For those who do, removing it is an additional and clunky step.
    this.remove();
  }

  // `firstUpdated()` instead of `connectedCallback()` so the Toast isn't shown
  // before `assertSlot()` has had a chance to check the slot.
  override firstUpdated() {
    Toasts.show(this);
  }

  override render() {
    // `hidden` is used to avoid a stylesheet for a single style.
    return html`<slot hidden ${assertSlot([Link, Text], true)}>
      <!--
        A description
        @type {Link | string}
      -->
    </slot>`;
  }
}
