import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './inline-alert.styles.js';
import severityInformationalIcon from './icons/severity-informational.js';
import severityMediumIcon from './icons/severity-medium.js';
import severityCriticalIcon from './icons/severity-critical.js';
import assertSlot from './library/assert-slot.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-inline-alert': InlineAlert;
  }
}

/**
 * @attr {'informational'|'medium'|'high'|'critical'} [variant='informational']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the alert
 */
@customElement('glide-core-inline-alert')
@final
export default class InlineAlert extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* c8 ignore end */

  static override styles = styles;

  @property({ reflect: true, useDefault: true })
  variant: 'informational' | 'medium' | 'high' | 'critical' = 'informational';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override firstUpdated() {
    this.#componentElementRef.value?.addEventListener(
      'animationend',
      () => {
        this.#componentElementRef.value?.classList.remove('added');
      },
      { once: true },
    );
  }

  override render() {
    return html`
      <div
        aria-label=${this.variant}
        class=${classMap({
          component: true,
          added: true,
          [this.variant]: true,
        })}
        data-test="component"
        role="alert"
        style="--private-animation-duration: ${this.#animationDuration}ms"
        ${ref(this.#componentElementRef)}
      >
        <div
          aria-hidden="true"
          class=${classMap({
            'icon-container': true,
            [this.variant]: true,
          })}
        >
          ${icons[this.variant]}
        </div>

        <div class="content">
          <slot ${assertSlot()}>
            <!--
              The content of the alert
              @required
              @type {Element | string}
            -->
          </slot>
        </div>
      </div>
    `;
  }

  #animationDuration = 100;

  #componentElementRef = createRef<HTMLElement>();
}

const icons = {
  informational: severityInformationalIcon,
  medium: severityMediumIcon,
  high: html`
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      style=${styleMap({
        height: 'var(--private-size, 1rem)',
        width: 'var(--private-size, 1rem)',
      })}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.8924 1.33334H4.10768C3.75626 1.33333 3.45307 1.33332 3.20336 1.35372C2.93979 1.37525 2.67765 1.4228 2.42539 1.55132C2.04907 1.74307 1.74311 2.04903 1.55136 2.42536C1.42283 2.67761 1.37529 2.93976 1.35376 3.20332C1.33335 3.45303 1.33336 3.75619 1.33337 4.10762V11.8924C1.33336 12.2438 1.33335 12.547 1.35376 12.7967C1.37529 13.0603 1.42283 13.3224 1.55136 13.5747C1.74311 13.951 2.04907 14.2569 2.42539 14.4487C2.67765 14.5772 2.93979 14.6248 3.20336 14.6463C3.45307 14.6667 3.75624 14.6667 4.10766 14.6667H11.8924C12.2438 14.6667 12.547 14.6667 12.7967 14.6463C13.0603 14.6248 13.3224 14.5772 13.5747 14.4487C13.951 14.2569 14.257 13.951 14.4487 13.5747C14.5773 13.3224 14.6248 13.0603 14.6463 12.7967C14.6667 12.547 14.6667 12.2438 14.6667 11.8924V4.10763C14.6667 3.7562 14.6667 3.45303 14.6463 3.20332C14.6248 2.93976 14.5773 2.67761 14.4487 2.42536C14.257 2.04903 13.951 1.74307 13.5747 1.55132C13.3224 1.4228 13.0603 1.37525 12.7967 1.35372C12.547 1.33332 12.2438 1.33333 11.8924 1.33334ZM8.66671 5.33334C8.66671 4.96515 8.36823 4.66667 8.00004 4.66667C7.63185 4.66667 7.33337 4.96515 7.33337 5.33334V8C7.33337 8.36819 7.63185 8.66667 8.00004 8.66667C8.36823 8.66667 8.66671 8.36819 8.66671 8V5.33334ZM8.00004 10C7.63185 10 7.33337 10.2985 7.33337 10.6667C7.33337 11.0349 7.63185 11.3333 8.00004 11.3333H8.00671C8.3749 11.3333 8.67338 11.0349 8.67338 10.6667C8.67338 10.2985 8.3749 10 8.00671 10H8.00004Z"
        fill="currentColor"
      />
    </svg>
  `,
  critical: severityCriticalIcon,
};
