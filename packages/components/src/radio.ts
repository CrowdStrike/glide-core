import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
// import { owSlot, owSlotType } from './library/ow.js';
import styles from './radio.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'cs-radio': CsRadio;
  }
}
/**
 * @description A radio input for use with `<cs-radio-group>` with label.
 *
 */
@customElement('cs-radio')
export default class CsRadio extends LitElement {
  static formAssociated = true;

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
  error = false;

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property()
  value = '';

  @state()
  label = '';

  override firstUpdated() {
    // owSlot , text only
    this.role = 'radio';
    this.ariaChecked = this.checked.toString();
    this.ariaDisabled = this.disabled.toString();
    this.ariaRequired = this.required.toString();
  }

  override render() {
    return html`
      <label class=${classMap({ component: true })}>
        <input
          id="radio"
          type="radio"
          tabindex="-1"
          class=${classMap({
            checked: this.checked,
            error: this.error,
            disabled: this.disabled,
          })}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
        />
        <slot></slot>
      </label>
    `;
  }

  override updated(): void {
    this.ariaInvalid = this.error.toString();
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadio>): void {
    if (this.hasUpdated) {
      if (changedProperties.has('checked')) {
        this.ariaChecked = this.checked.toString();
      }

      if (changedProperties.has('disabled')) {
        this.ariaDisabled = this.checked.toString();
      }

      if (changedProperties.has('required')) {
        this.ariaRequired = this.required.toString();
      }
    }
  }
}
