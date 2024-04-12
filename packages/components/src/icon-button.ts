import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './icon-button.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-icon-button': CsIconButton;
  }
}

/**
 * @slot - Reserved for the icon to display inside of the button.
 */
@customElement('cs-icon-button')
export default class CsIconButton extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ reflect: true })
  override ariaExpanded: string | null = null;

  @property({ reflect: true })
  override ariaHasPopup: string | null = null;

  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Text read aloud for screenreaders. For accessibility, this should always be provided. */
  @property()
  label: string = '';

  @property({ attribute: 'variant', reflect: true })
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary';

  override render() {
    return html`
      <button
        aria-label=${this.label}
        class=${classMap({
          button: true,
          primary: this.variant === 'primary',
          secondary: this.variant === 'secondary',
          tertiary: this.variant === 'tertiary',
        })}
        type="button"
        ?disabled=${this.disabled}
      >
        <slot></slot>
      </button>
    `;
  }
}
