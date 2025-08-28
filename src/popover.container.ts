import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import final from './library/final.js';
import uniqueId from './library/unique-id.js';
import assertSlot from './library/assert-slot.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-popover-container': PopoverContainer;
  }
}

/**
 * @attr {'tooltip'|'dialog'} [role]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the popover
 */
@customElement('glide-core-popover-container')
@final
export default class PopoverContainer extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  @property({ reflect: true, useDefault: true })
  override get role(): 'tooltip' | 'dialog' {
    return this.#role;
  }

  override set role(role: 'tooltip' | 'dialog') {
    this.#role = role;

    this.dispatchEvent(new Event('private-role-change', { bubbles: true }));
  }

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override connectedCallback() {
    super.connectedCallback();

    this.id = uniqueId();
  }

  override render() {
    return html`<slot ${assertSlot()}>
      <!--
        The content of the popover
        @type {Element | string}
      -->
    </slot>`;
  }

  #role: 'tooltip' | 'dialog' = 'tooltip';
}
