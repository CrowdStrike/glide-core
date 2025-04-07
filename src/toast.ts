import './icon-button.js';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { nanoid } from 'nanoid';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreToasts from './toast.toasts.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
import GlideCoreLink from './link.js';
import assertSlot from './library/assert-slot.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-toast': GlideCoreToast;
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
 * @slot {GlideCoreLink | string} - A description
 *
 * @fires {Event} dismiss
 */
@customElement('glide-core-toast')
@final
export default class GlideCoreToast extends LitElement {
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
  privateHide = false;

  @property({ type: Boolean })
  privateHideViaDismissButton = false;

  @property({ type: Boolean })
  privateShow = false;

  @property({ attribute: false })
  privateTimeoutId?: ReturnType<typeof setTimeout>;

  @property({ reflect: true, useDefault: true })
  variant: 'informational' | 'success' | 'error' = 'informational';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();
    this.id = nanoid();
  }

  // `firstUpdated()` instead of `connectedCallback()` so the toast isn't shown
  // before `assertSlot()` has had a chance to check the slot.
  override firstUpdated() {
    GlideCoreToasts.privateAdd(this);
  }

  privateDismiss() {
    this.dispatchEvent(new Event('dismiss', { bubbles: true, composed: true }));

    // It's a tough call whether we should remove Toast for the consumers or ask
    // them should remove it themselves. It's never ideal to manipulate a consumer's
    // DOM. But a stale element on the page is likely to cause confusion given some
    // consumers are unlikely to remove it, whether they know they should or not.
    // For those who do, removing it is an additional and clunky step.
    this.remove();
  }

  override render() {
    // `hidden` is used to avoid a stylesheet for a single style.
    return html`<slot hidden ${assertSlot([GlideCoreLink, Text], true)}>
      <!--
        A description
        @type {GlideCoreLink | string}
      -->
    </slot>`;
  }
}
