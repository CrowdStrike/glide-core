import '../icon-button/icon-button';
import '@crowdstrike/glide-icons/general/eye-off/line.js';
import '@crowdstrike/glide-icons/general/eye/line.js';
import '@crowdstrike/glide-icons/general/info-circle/line.js';
import '@crowdstrike/glide-icons/general/search-md/solid.js';
import '@crowdstrike/glide-icons/general/x/solid.js';
import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import {
  customElement,
  property,
  queryAssignedNodes,
  state,
} from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import styles from './input.styles.js';

/*
 * https://fettblog.eu/typescript-array-includes/
 */
function arrayIncludes<T extends U, U>(
  options: ReadonlyArray<T>,
  option: U,
): option is T {
  return options.includes(option as T);
}

/*
 * These are selected from native types listed on MDN:
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
 *
 * This is subject to change pending discussion with the designers
 */
export const SUPPORTED_TYPES = [
  'email',
  'number',
  'password',
  'search',
  'tel',
  'text',
  'url',
] as const;

type SupportedTypes = (typeof SUPPORTED_TYPES)[number];

/**
 * @description A custom-built input.
 */
@customElement('cs-input')
export default class CsInput extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static override styles = styles;

  @property({
    converter(value) {
      if (value === null) {
        return 'text';
      }

      if (arrayIncludes(SUPPORTED_TYPES, value)) {
        return value;
      }

      return 'text';
    },
  })
  // Should only have values from the supported type list, defaults to "text" otherwise
  type: SupportedTypes = 'text';

  @property({ reflect: true })
  name?: string;

  @property()
  value = '';

  @property()
  label?: string;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ attribute: 'label-position' })
  labelPosition: 'left' | 'top' = 'left';

  @property()
  placeholder?: string;

  @property({ type: Boolean })
  clearable = false;

  /** For 'password' type, whether to show a button to toggle the password's visibility */
  @property({ attribute: 'password-toggle', type: Boolean })
  passwordToggle = false;

  @property({ attribute: 'password-visible', type: Boolean })
  passwordVisible = false;

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({
    type: Number,
    attribute: 'max-character-count',
    converter(value) {
      if (value === null) {
        return;
      }

      const result = Number.parseInt(value, 10);

      if (Number.isNaN(result) || result < 1) {
        return;
      }

      return result;
    },
  })
  maxCharacterCount?: number;

  @queryAssignedNodes({ slot: 'description' })
  descriptionNodes!: NodeListOf<HTMLElement>;

  @queryAssignedNodes({ slot: 'prefix' })
  prefixIconNodes!: NodeListOf<HTMLElement>;

  @queryAssignedNodes({ slot: 'suffix' })
  suffixIconNodes!: NodeListOf<HTMLElement>;

  get form() {
    return this.#internals.form;
  }

  get validity() {
    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  /** Removes focus from the input. */
  override blur() {
    this.#inputElement?.blur();
  }

  checkValidity() {
    this.isCheckingValidity = true;

    return this.#internals.checkValidity();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  override firstUpdated() {
    this.#setValidityToInputValidity();
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') || '';
  }

  get isTypeSearch() {
    return this.type === 'search';
  }

  get hasClearIcon() {
    return this.clearable && !this.disabled && !this.readonly;
  }

  get isClearIconVisible() {
    return this.hasClearIcon && this.value.length > 0;
  }

  override render() {
    return html`
      <div
        class=${classMap({
          component: true,
          'component--error':
            this.#isShowValidationFeedback || this.#isMaxCharacterCountExceeded,
          'component--input-expand-row': this.hasDescriptionOrCharCount,
        })}
        data-test="component"
      >
        <label
          class=${classMap({
            label: true,
            'label--left': this.labelPosition === 'left',
            'label--top': this.labelPosition === 'top',
            'label--visually-hidden': this.hideLabel,
          })}
          for="input"
        >
          <span
            >${this.label}${this.required
              ? html`<span class="label__required">*</span>`
              : ''}</span
          >
        </label>
        <div
          class=${classMap({
            'input-box': true,
            'input-box--focused': this.hasFocus,
            'input-box--empty': this.value === '',
            'input-box--readonly': this.readonly && !this.disabled,
          })}
        >
          <div part="prefix" class="prefix">
            <slot name="prefix"></slot>
          </div>
          <input
            id="input"
            type=${this.type === 'password' && this.passwordVisible
              ? 'text'
              : this.type}
            .value=${this.value}
            placeholder=${ifDefined(this.placeholder)}
            ?required=${this.required}
            ?readonly=${this.readonly}
            ?disabled=${this.disabled}
            @focus=${this.#handleFocus}
            @blur=${this.#handleBlur}
            @change=${this.#handleChange}
            @input=${this.#handleInput}
            ${ref(this.#inputElementRef)}
          />
          <!-- TODO: We should localize the aria-labels in the future -->
          ${this.hasClearIcon
            ? html`
                <cs-icon-button
                  variant="tertiary"
                  class=${classMap({
                    'clear-icon-button': true,
                    'clear-icon-button--visible': this.isClearIconVisible,
                  })}
                  aria-label="Clear entry"
                  @click=${this.#handleClearClick}
                  tabindex="-1"
                >
                  <slot name="clear-icon">
                    <cs-icon-general-x-solid></cs-icon-general-x-solid>
                  </slot>
                </cs-icon-button>
              `
            : ''}
          ${this.type === 'password' && this.passwordToggle && !this.disabled
            ? html`
                <cs-icon-button
                  variant="tertiary"
                  class="password-toggle"
                  aria-label=${this.passwordVisible
                    ? 'Hide password'
                    : 'Show password'}
                  aria-controls="input"
                  aria-expanded=${this.passwordVisible ? 'true' : 'false'}
                  @click=${this.#handlePasswordToggle}
                  tabindex="-1"
                >
                  ${this.passwordVisible
                    ? html`<cs-icon-general-eye-off-line></cs-icon-general-eye-off-line>`
                    : html`<cs-icon-general-eye-line></cs-icon-general-eye-line>`}
                </cs-icon-button>
              `
            : ''}
          <div part="suffix" class="suffix">
            ${this.isTypeSearch
              ? html`<cs-icon-general-search-md-solid
                  class="search-icon"
                ></cs-icon-general-search-md-solid>`
              : html`<slot
                  name="suffix"
                  @slotchange=${this.#onSuffixIconSlotChange}
                ></slot>`}
          </div>
        </div>
        <div class="meta">
          <div>
            <slot
              class="description"
              name="description"
              @slotchange=${this.#onDescriptionSlotChange}
            ></slot>
          </div>
          ${this.maxCharacterCount
            ? html`
                <div class="meta__character-count">
                  ${this.valueCharacterCount}/${this.maxCharacterCount}
                </div>
              `
            : nothing}
        </div>
      </div>
    `;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  get valueCharacterCount() {
    return this.value.length;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event listeners on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      if (!this.isCheckingValidity) {
        this.isReportValidityOrSubmit = true;

        // - `this.#internals.delegatesFocus` is preferred because it's declarative. But
        //    it's limited to focusing the first focusable element. That doesn't work for
        //    us because our first focusable element is the tooltip when it's present.
        //
        // - Canceling this event means the input won't get focus, even if we were to use
        //   `this.#internals.delegatesFocus`.
        //
        // - The browser will ignore this if Input isn't the first invalid form control.
        //
        // TODO
        // Try passing `focusVisible` after browsers support it. It may prevent the issue
        // where the input itself has a focus outline after this call.
        //
        // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
        this.focus();
      }
    });
  }

  @state()
  private hasDescriptionOrCharCount = false;

  @state() private hasFocus = false;

  @state()
  private hasPrefixIconSlot = false;

  @state()
  private hasSuffixIconSlot = false;

  @state()
  private isCheckingValidity?: boolean;

  @state()
  private isReportValidityOrSubmit = false;

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isMaxCharacterCountExceeded() {
    return Boolean(
      this.maxCharacterCount &&
        this.valueCharacterCount > this.maxCharacterCount,
    );
  }

  get #isShowValidationFeedback() {
    return (
      !this.disabled && !this.validity?.valid && this.isReportValidityOrSubmit
    );
  }

  get #inputElement(): HTMLInputElement | undefined {
    return this.#inputElementRef.value;
  }

  #handleBlur() {
    this.hasFocus = false;
  }

  #handleChange(event: Event) {
    this.value = this.#inputElement?.value || '';

    this.#setValidityToInputValidity();

    // Unlike "input" events, these don't bubble. We have to manually dispatch them.
    this.dispatchEvent(new Event(event.type, event));
  }

  #handleClearClick(event: MouseEvent) {
    this.value = '';
    this.dispatchEvent(new Event('clear'));
    this.#inputElement?.focus();
    this.#setValidityToInputValidity();

    event.stopPropagation();
  }

  #handleFocus() {
    this.hasFocus = true;
  }

  #handleInput() {
    this.value = this.#inputElement?.value || '';

    this.#setValidityToInputValidity();
  }

  #handlePasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }

  #onDescriptionSlotChange() {
    this.hasDescriptionOrCharCount =
      this.descriptionNodes?.length > 0 || Boolean(this.maxCharacterCount);
  }

  #onPrefixIconSlotChange() {
    this.hasPrefixIconSlot = this.prefixIconNodes?.length > 0;
  }

  #onSuffixIconSlotChange() {
    this.hasSuffixIconSlot = this.suffixIconNodes?.length > 0;
  }

  /**
   * this.#internals.setValidity is required to properly attach the validation state to the form.
   * We're simply setting our validity to be the same as the input element's validity
   */
  async #setValidityToInputValidity() {
    await this.updateComplete;

    this.#internals.setValidity(
      this.#inputElement?.validity,
      this.#inputElement?.validationMessage,
      this.#inputElement,
    );
  }
}
