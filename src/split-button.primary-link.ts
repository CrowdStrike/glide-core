import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './split-button.primary-button.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-primary-link': GlideCoreSplitButtonPrimaryLink;
  }
}

/**
 * @slot icon - An optional icon before the label.
 */
@customElement('glide-core-split-button-primary-link')
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
  label?: string;

  @property({ reflect: true })
  url?: string;

  @property()
  privateSize: 'large' | 'small' = 'large';

  @property()
  privateVariant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  readonly version = packageJson.version;

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
        <slot name="icon"></slot>
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
      <slot name="icon"></slot>
      ${this.label}
    </a>`;
  }
}
