import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './split-button-container.button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-split-button-container-button': GlideCoreSplitButtonContainerButton;
  }
}

/**
 * @description - A button for use in the `"primary-action"` slot of `<glide-core-split-button-container>`.
 *
 * @slot icon - An optional icon to display before the label.
 */
@customElement('glide-core-split-button-container-button')
export default class GlideCoreSplitButtonContainerButton extends LitElement {
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

  @property({ reflect: true })
  label?: string;

  @state()
  privateDisabled = false;

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
        disabled: this.privateDisabled,
        [this.privateVariant]: true,
        [this.privateSize]: true,
      })}
      type="button"
      ?disabled=${this.privateDisabled}
    >
      <slot name="icon"></slot>
      ${this.label}
    </button>`;
  }
}
