import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './split-button.primary-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-primary-button': GlideCoreSplitButtonPrimaryButton;
  }
}

/**
 * @slot icon - An optional icon before the label.
 */
@customElement('glide-core-split-button-primary-button')
export default class GlideCoreSplitButtonPrimaryButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
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
  label?: string;

  @state()
  privateSize: 'large' | 'small' = 'large';

  @state()
  privateVariant: 'primary' | 'secondary' = 'primary';

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
