import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './radio.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-radio': CsRadio;
  }
}
/**
 * @description A radio element for use with `<cs-radio-group>`.
 *
 */
@customElement('cs-radio')
export default class CsRadio extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean })
  invalid = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property()
  value = '';

  @property({ reflect: true })
  label = '';

  override firstUpdated() {
    this.role = 'radio';
    this.ariaChecked = this.checked.toString();
    this.ariaDisabled = this.disabled.toString();
    this.ariaInvalid = this.invalid.toString();
    this.ariaRequired = this.required.toString();
    this.ariaLabel = this.label;
  }

  override render() {
    return html`
      <span class=${classMap({ component: true, disabled: this.disabled })}>
        <span
          id="radio"
          class=${classMap({
            'radio-circle': true,
            checked: this.checked,
          })}
          data-test="radio"
          data-test-error=${this.invalid}
        ></span>
        ${this.label}
      </span>
    `;
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadio>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('checked')) {
        this.ariaChecked = this.checked.toString();
      }

      if (changedProperties.has('disabled')) {
        this.ariaDisabled = this.disabled.toString();
      }

      if (changedProperties.has('required')) {
        this.ariaRequired = this.required.toString();
      }

      if (changedProperties.has('invalid')) {
        this.ariaInvalid = this.invalid.toString();
      }

      if (changedProperties.has('label')) {
        this.ariaLabel = this.label;
      }
    }
  }
}
