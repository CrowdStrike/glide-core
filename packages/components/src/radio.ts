import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit-html/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { owSlot, owSlotType } from './library/ow.js';
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

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  required = false;

  @property()
  value = '';

  @state()
  label = '';

  override firstUpdated() {
    owSlot(this.#defaultSlotElementRef.value);
    owSlotType(this.#defaultSlotElementRef.value, [Text]);

    this.role = 'radio';
    this.ariaChecked = this.checked.toString();
    this.ariaDisabled = this.disabled.toString();
    this.ariaInvalid = this.invalid.toString();
    this.ariaRequired = this.required.toString();
  }

  override render() {
    return html`
      <span class=${classMap({ component: true })}>
        <span
          id="radio"
          class=${classMap({
            'radio-circle': true,
            checked: this.checked,
            invalid: this.invalid,
            disabled: this.disabled,
          })}
        ></span>
        <slot ${ref(this.#defaultSlotElementRef)}></slot>
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
    }
  }

  #defaultSlotElementRef = createRef<HTMLSlotElement>();
}
