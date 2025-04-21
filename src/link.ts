import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { createRef, ref } from 'lit/directives/ref.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './link.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-link': GlideCoreLink;
  }
}

/**
 * @attr {string} href
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [download]
 * @attr {'_blank'|'_parent'|'_self'|'_top'} [target]
 *
 * @readonly
 * @attr {string} [version]
 */
@customElement('glide-core-link')
@final
export default class GlideCoreLink extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true })
  @required
  href?: string;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  download?: string;

  @property({ reflect: true })
  target?: '_blank' | '_parent' | '_self' | '_top';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override click() {
    this.#componentElementRef.value?.click();
  }

  override render() {
    return html`<a
      aria-disabled=${this.disabled}
      class=${classMap({ component: true, disabled: this.disabled })}
      data-test="component"
      download=${ifDefined(this.download)}
      href=${ifDefined(this.href)}
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
