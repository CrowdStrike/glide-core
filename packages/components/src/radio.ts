import { LitElement, type PropertyValueMap, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
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

  // aria-checked proxy
  @property({ type: Boolean, reflect: true })
  checked? = false;

  @property({ type: Boolean, reflect: true })
  disabled? = false;

  @property()
  name = '';

  @property({ type: Boolean, reflect: true })
  required?: boolean;

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
      <span tabindex=${this.tabIndex} ${ref(this.#containerElementRef)}>
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
      </span>
    `;
  }

  override willUpdate(changedProperties: PropertyValueMap<CsRadio>): void {
    if (this.hasUpdated && changedProperties.has('checked')) {
      const value = changedProperties.get('checked');

      this.checked = !value;

      if (value === false) {
        this.#containerElementRef.value?.focus();
        this.tabIndex = 0;
      } else {
        this.tabIndex = -1;
      }

      this.ariaChecked = value === true ? 'false' : 'true';
    }
  }

  #containerElementRef = createRef<HTMLSpanElement>();
}
