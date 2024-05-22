import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
// import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
// import { ifDefined } from 'lit-html/directives/if-defined.js';
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
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this.#disabled;
  }

  set disabled(value: boolean) {
    this.#disabled = value;
    this.ariaDisabled = this.disabled.toString();
  }

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  get required() {
    return this.#required;
  }

  set required(value) {
    this.#required = value;
    this.ariaRequired = value ? 'true' : 'false';
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
      <span
        class=${classMap({ toggle: true, disabled: Boolean(this.disabled) })}
        aria-hidden="true"
        >${this.checked ? 'x' : 'o'}</span
      >
      <input
        id="radio"
        type="radio"
        tabindex="-1"
        class=${classMap({
          component: true,
          checked: Boolean(this.checked),
          disabled: Boolean(this.disabled),
        })}
        ?checked=${this.checked}
        ?disabled=${this.disabled}
        ?required=${this.required}
        name=${this.name}
      />
      <slot></slot>
    `;
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadio>): void {
    if (this.hasUpdated && changedProperties.has('checked') && !this.disabled) {
      if (this.checked) {
        this.ariaChecked = 'true';
        this.tabIndex = 0;
        this.focus();
      } else {
        this.ariaChecked = 'false';
        this.tabIndex = -1;
      }
    }
  }

  #disabled = false;

  #required = false;
}
