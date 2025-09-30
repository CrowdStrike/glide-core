import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property, state } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './radio-group.radio.styles.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-radio-group-radio': RadioGroupRadio;
  }
}

/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @fires {Event} change
 * @fires {Event} input
 */
@customElement('glide-core-radio-group-radio')
@final
export default class RadioGroupRadio extends LitElement {
  /* v8 ignore start */
  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };
  /* v8 ignore stop */

  static override styles = styles;

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
    this.ariaChecked = isChecked && !this.disabled ? 'true' : 'false';

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

  set disabled(isDisabled: boolean) {
    this.#disabled = isDisabled;
    this.ariaDisabled = isDisabled.toString();
    this.ariaChecked = this.checked && !isDisabled ? 'true' : 'false';

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
   * @default ''
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
  readonly version: string = packageJson.version;

  override firstUpdated() {
    this.ariaChecked =
      this.checked && !this.disabled && this === this.lastCheckedRadio
        ? 'true'
        : 'false';

    this.ariaDisabled = this.disabled.toString();
    this.ariaInvalid = this.privateInvalid.toString();
    this.ariaRequired = this.privateRequired.toString();
    this.role = 'radio';

    if (this.label) {
      this.ariaLabel = this.label;
    }
  }

  @state()
  private get lastCheckedRadio(): RadioGroupRadio | undefined {
    const radios = this.parentElement?.querySelectorAll(
      'glide-core-radio-group-radio',
    );

    if (radios && radios.length > 0) {
      return [...radios].findLast((radio) => radio.checked);
    }
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          disabled: this.disabled,
        })}
        data-test="component"
      >
        <div
          class=${classMap({
            circle: true,
            checked:
              this.checked && this === this.lastCheckedRadio && !this.disabled,
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
