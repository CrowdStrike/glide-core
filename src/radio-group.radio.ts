import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import styles from './radio-group.radio.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-radio': GlideCoreRadio;
  }
}

@customElement('glide-core-radio')
export default class GlideCoreRadio extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
  };

  static override styles = styles;

  @property({ type: Boolean, reflect: true })
  get checked() {
    return this.#checked;
  }

  set checked(checked: boolean) {
    const old = this.#checked;
    this.#checked = checked;

    this.ariaChecked = checked.toString();

    // `this.checked` can be changed programmatically. Radio Group needs to know when
    // that happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-checked-change', {
        bubbles: true,
        detail: {
          // Without knowing what the old value was, Radio Group would be unable to
          // update `this.value`.
          old,
          new: checked,
        },
      }),
    );
  }

  @property({ type: Boolean, reflect: true })
  get disabled() {
    return this.#disabled;
  }

  set disabled(disabled: boolean) {
    this.#disabled = disabled;

    this.ariaDisabled = disabled.toString();
  }

  // Private because it's only meant to be used by Radio Group.
  @property({ type: Boolean })
  get privateInvalid() {
    return this.#privateInvalid;
  }

  set privateInvalid(invalid: boolean) {
    this.#privateInvalid = invalid;

    this.ariaInvalid = invalid.toString();
  }

  @property({ reflect: true })
  get label() {
    return this.#label;
  }

  set label(label: string) {
    this.#label = label;

    this.ariaLabel = label.toString();
  }

  // Private because it's only meant to be used by Radio Group.
  @property({ type: Boolean, reflect: true })
  get privateRequired() {
    return this.#privateRequired;
  }

  set privateRequired(required: boolean) {
    this.#privateRequired = required;

    this.ariaRequired = required.toString();
  }

  @property()
  get value() {
    return this.#value;
  }

  set value(value: string) {
    const old = this.#value;
    this.#value = value;

    // `this.value` can be changed programmatically. Radio Group needs to know when
    // that happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-value-change', {
        bubbles: true,
        detail: {
          // Without knowing what the old value was, Radio Group would be unable to
          // update `this.value`.
          old,
          new: value,
        },
      }),
    );
  }

  override firstUpdated() {
    this.ariaChecked = this.checked.toString();
    this.ariaDisabled = this.disabled.toString();
    this.ariaInvalid = this.privateInvalid.toString();
    this.ariaLabel = this.label;
    this.ariaRequired = this.privateRequired.toString();
    this.role = 'radio';

    // We only want the animation to run *after*
    // the user interacts with it directly. By adding
    // this check, it ensures the animation does not play
    // on first render to prevent distractions for the
    // user.
    this.#isAfterFirstUpdated = true;
  }

  override render() {
    return html`
      <span
        class=${classMap({ component: true, disabled: this.disabled })}
        data-test="component"
      >
        <span
          class=${classMap({
            'radio-circle': true,
            checked: this.checked,
            animate: this.#isAfterFirstUpdated,
          })}
          data-test="radio"
        ></span>
        ${this.#label}
      </span>
    `;
  }

  #checked = false;

  #disabled = false;

  #isAfterFirstUpdated = false;

  #label = '';

  #privateInvalid = false;

  #privateRequired = false;

  #value = '';
}
