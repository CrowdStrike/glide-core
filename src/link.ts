import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './link.styles.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-link': Link;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [download]
 * @attr {string} [href]
 * @attr {string} [rel]
 * @attr {'_blank'|'_parent'|'_self'|'_top'} [target]
 *
 * @readonly
 * @attr {string} [version]
 */
@customElement('glide-core-link')
@final
export default class Link extends LitElement {
  /* c8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  download?: string;

  @property({ reflect: true })
  href?: string;

  @property({ reflect: true })
  rel?: string;

  @property({ reflect: true })
  target?: '_blank' | '_parent' | '_self' | '_top';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override render() {
    // Lit-a11y also wants a keyboard listener on anything with a "click" listener and
    // doesn't account for `role="link"`.
    //
    /* eslint-disable lit-a11y/click-events-have-key-events */
    return this.disabled
      ? html`<span
          aria-disabled="true"
          class=${classMap({
            component: true,
            disabled: this.disabled,
          })}
          data-test="component"
          role="link"
          tabindex="0"
          @click=${this.#onClick}
          ${ref(this.#componentElementRef)}
        >
          ${this.label}
        </span>`
      : html`<a
          class=${classMap({
            component: true,
            disabled: this.disabled,
            href: Boolean(this.href),
          })}
          data-test="component"
          download=${ifDefined(this.download)}
          href=${ifDefined(this.href)}
          rel=${ifDefined(this.rel)}
          target=${ifDefined(this.target)}
          @click=${this.#onClick}
          ${ref(this.#componentElementRef)}
        >
          ${this.label}
        </a>`;
  }

  #componentElementRef = createRef<HTMLAnchorElement>();

  #onClick(event: PointerEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}
