import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './split-button.primary-button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-primary-link': GlideCoreSplitButtonPrimaryLink;
  }
}

/**
 * @attr {string} label
 * @attr {string} url
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 */
@customElement('glide-core-split-button-primary-link')
@final
export default class GlideCoreSplitButtonPrimaryLink extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ reflect: true })
  @required
  url?: string;

  @property()
  privateSize: 'large' | 'small' = 'large';

  @property()
  privateVariant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  override render() {
    if (this.disabled) {
      return html`<span
        aria-disabled="true"
        class=${classMap({
          component: true,
          disabled: true,
          [this.privateVariant]: true,
          [this.privateSize]: true,
        })}
        role="link"
      >
        <slot name="icon">
          <!--
            An icon before the label
            @type {Element}
          -->
        </slot>

        ${this.label}
      </span>`;
    }

    return html`<a
      class=${classMap({
        component: true,
        [this.privateVariant]: true,
        [this.privateSize]: true,
      })}
      data-test="component"
      href=${ifDefined(this.url)}
    >
      <slot name="icon">
        <!-- @type {Element} -->
      </slot>

      ${this.label}
    </a>`;
  }
}
