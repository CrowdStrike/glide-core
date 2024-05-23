import { LitElement, /*type PropertyValueMap,*/ html /*, nothing*/ } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
// import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
// import { owSlot, owSlotType } from './library/ow.js';
import styles from './radio.styles.js';
// import { createRef, ref } from 'lit-html/directives/ref.js';

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
  get checked() {
    return this.#checked;
  }

  set checked(value) {
    this.#checked = value;
    this.ariaChecked = value.toString();
  }

  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this.#disabled;
  }

  set disabled(value) {
    this.#disabled = value;
    this.ariaDisabled = value.toString();
  }

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  get required() {
    return this.#required;
  }

  set required(value) {
    this.#required = value;
    this.ariaRequired = value.toString();
  }

  @property()
  value = '';

  @state()
  label = '';

  override firstUpdated() {
    // owSlot , text only
    this.role = 'radio';
  }

  override render() {
    return html`
      <label class=${classMap({ component: true })}>
        <input
          id="radio"
          type="radio"
          tabindex="-1"
          class=${classMap({ checked: this.checked })}
          ?checked=${this.checked}
          ?disabled=${this.disabled}
          ?required=${this.required}
          name=${this.name}
        />
        <slot></slot>
      </label>
    `;
  }

  #checked = false;

  #disabled = false;

  #required = false;
}
