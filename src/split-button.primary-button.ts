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
    'glide-core-split-button-primary-button': GlideCoreSplitButtonPrimaryButton;
  }
}

/**
 * @slot icon - An optional icon before the label.
 */
@customElement('glide-core-split-button-primary-button')
@final
export default class GlideCoreSplitButtonPrimaryButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: shadowRootMode,
  };

  static override styles = styles;

  @property({ attribute: 'aria-controls', reflect: true })
  ariaControls: string | null = null;

  @property({ attribute: 'aria-expanded', reflect: true })
  override ariaExpanded: 'true' | 'false' | null = null;

  @property({ attribute: 'aria-haspopup', reflect: true })
  override ariaHasPopup:
    | 'true'
    | 'false'
    | 'menu'
    | 'listbox'
    | 'tree'
    | 'grid'
    | 'dialog'
    | null = null;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ reflect: true })
  @required
  label?: string;

  @property()
  privateSize: 'large' | 'small' = 'large';

  @property()
  privateVariant: 'primary' | 'secondary' = 'primary';

  @property({ reflect: true })
  readonly version = packageJson.version;

  override render() {
    return html`<button
      aria-controls=${ifDefined(this.ariaControls ?? undefined)}
      aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
      aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
      class=${classMap({
        component: true,
        disabled: this.disabled,
        [this.privateVariant]: true,
        [this.privateSize]: true,
      })}
      data-test="component"
      type="button"
      ?disabled=${this.disabled}
    >
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }
}
