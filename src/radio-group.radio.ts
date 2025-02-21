import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './radio-group.radio.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-radio-group-radio': GlideCoreRadioGroupRadio;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {string} [value]
 *
 * @readonly
 * @attr {0.20.0} [version]
 *
 * @fires {Event} change
 * @fires {Event} input
 */
@customElement('glide-core-radio-group-radio')
@final
export default class GlideCoreRadioGroupRadio extends LitElement {
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
  };

  static override styles = styles;

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get checked(): boolean {
    return this.#checked;
  }

  set checked(isChecked: boolean) {
    const wasChecked = this.#checked;

    this.#checked = isChecked;
    this.ariaChecked = isChecked.toString();

    if (isChecked && wasChecked !== isChecked) {
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

      this.dispatchEvent(
        new Event('change', { bubbles: true, composed: true }),
      );
    }

    // `this.checked` can be set programmatically. Radio Group needs to know when
    // that happens so it can update its own `this.value`.
    this.dispatchEvent(
      new CustomEvent('private-checked-change', {
        bubbles: true,
        detail: {
          // Without knowing what the old value was, Radio Group would be unable to
          // update `this.value`.
          old: wasChecked,
          new: isChecked,
        },
      }),
    );
  }

  /**
   * @default false
   */
  @property({ type: Boolean, reflect: true })
  get disabled(): boolean {
    return this.#disabled;
  }

  set disabled(disabled: boolean) {
    this.#disabled = disabled;
    this.ariaDisabled = disabled.toString();

    // `this.disabled` can be changed programmatically. Radio Group needs to know when
    // that happens so it can make radios tabbable or untabbable.
    this.dispatchEvent(
      new CustomEvent('private-disabled-change', {
        bubbles: true,
      }),
    );
  }

  // Private because it's only meant to be used by Radio Group.
  @property({ type: Boolean })
  get privateInvalid() {
    return this.#privateInvalid;
  }

  // Private because it's only meant to be used by Radio Group.
  set privateInvalid(invalid: boolean) {
    this.#privateInvalid = invalid;
    this.ariaInvalid = invalid.toString();
  }

  /**
   * @default undefined
   */
  @property({ reflect: true })
  @required
  get label(): string | undefined {
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

  // Private because it's only meant to be used by Radio Group.
  set privateRequired(required: boolean) {
    this.#privateRequired = required;
    this.ariaRequired = required.toString();
  }

  /**
   * @default undefined
   */
  @property()
  get value(): string {
    return this.#value;
  }

  set value(value: string) {
    const old = this.#value;
    this.#value = value;

    // `this.value` can be set programmatically. Radio Group needs to know when
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

  @property({ reflect: true })
  readonly version = packageJson.version;

  override firstUpdated() {
    this.ariaChecked = this.checked.toString();
    this.ariaDisabled = this.disabled.toString();
    this.ariaInvalid = this.privateInvalid.toString();
    this.ariaRequired = this.privateRequired.toString();
    this.role = 'radio';

    if (this.label) {
      this.ariaLabel = this.label;
    }
  }

  override render() {
    return html`
      <div class="component" data-test="component">
        <div
          class=${classMap({
            circle: true,
            checked: this.checked,
            disabled: this.disabled,
            animate: this.hasUpdated,
          })}
          data-test="radio"
        ></div>

        ${this.#label}
      </div>
    `;
  }

  #checked = false;

  #disabled = false;

  #label?: string;

  #privateInvalid = false;

  #privateRequired = false;

  #value = '';
}
