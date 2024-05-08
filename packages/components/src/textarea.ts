import { LitElement, html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import styles from './textarea.styles.js';

/**
 * @description A custom-built textarea.
 *
 * @slot description - Textarea description
 *
 */
@customElement('cs-textarea')
export default class CsTextarea extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: window.navigator.webdriver ? 'open' : 'closed',
  };

  static override styles = styles;

  @property()
  value = '';

  @property()
  label?: string = '';

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel? = false;

  @property({ attribute: 'label-position' })
  labelPosition?: 'left' | 'top' = 'left';

  @property()
  placeholder?: string = '';

  @property({ reflect: true, type: Number })
  rows: number = 2;

  @property({ type: Boolean })
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

  @property({ reflect: true })
  name?: string;

  override blur() {
    this.#textareaRef.value?.blur();
  }

  checkValidity() {
    this.isCheckingValidity = true;
    return this.#internals.checkValidity();
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.form?.removeEventListener('formdata', this.#onFormdata);
    this.removeEventListener('invalid', this.#onInvalid);
  }

  // An arrow function field instead of a method so `this` is closed over and
  get form() {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  get validationMessage(): string {
    return this.#internals.validationMessage;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  override focus(options?: FocusOptions) {
    this.#textareaRef.value?.focus(options);
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  override render() {
    return html`<div
      class=${classMap({
        textarea: true,
        column: this.labelPosition === 'top',
      })}
    >
      <div
        class=${classMap({
          'label-container': true,
          'label-container--visually-hidden': Boolean(this.hideLabel),
          'label-container--top': this.labelPosition === 'top',
        })}
        data-test-label-container
        data-test-label-container--visually-hidden=${Boolean(this.hideLabel) ||
        nothing}
        data-test-label-container--top=${this.labelPosition === 'top' ||
        nothing}
      >
        <label
          for="cs-textarea"
          class=${classMap({
            'label--font': true,
          })}
        >
          ${this.label}${when(
            this.required,
            () =>
              html`<span class="label--required" data-test-label-required
                >*</span
              >`,
          )}
        </label>
      </div>
      <div
        class=${classMap({
          container: true,
        })}
      >
        <textarea
          id="cs-textarea"
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
          rows=${this.rows}
          ?required=${this.required}
          ?readonly=${this.readonly}
          class=${classMap({
            font: true,
            'read-only': this.readonly,
            'invalid-color': this.#isShowValidationFeedback,
            'label-container--top': this.labelPosition === 'top',
          })}
          ?disabled=${this.disabled}
          aria-describedby="description"
          ${ref(this.#textareaRef)}
          @input=${this.#onInput}
          @change=${this.#onChange}
          data-test-textarea-invalid-color=${this.#isShowValidationFeedback ||
          nothing}
        >
${this.value}</textarea
        >
        <div
          class=${classMap({
            'description-container': true,
            'description-container--invalid-color':
              this.#isShowValidationFeedback,
          })}
          data-test-description-container
          data-test-description-container--invalid-color=${this
            .#isShowValidationFeedback || nothing}
        >
          <div>
            <slot id="description" name="description"></slot>
          </div>
          ${when(
            this.maxCharacterCount,
            () =>
              html`<div
                class=${classMap({
                  'character-count-container': true,
                  'invalid-color': this.#isInvalidCharacterLength,
                })}
                data-test-max-character-count
                data-test-max-character-count--invalid-color=${this
                  .#isInvalidCharacterLength || nothing}
              >
                ${this.value.length}/${this.maxCharacterCount}
              </div>`,
          )}
        </div>
      </div>
    </div>`;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  override updated() {
    if (this.#textareaRef.value) {
      this.#textareaRef.value.value = this.value;
    }

    // This ensures validity is re-evaluated when an attribute changes.
    // Although this causes onUpdateValidityState to run twice when typing,
    // the overhead should be insignificant
    this.#onUpdateValidityState();
  }

  constructor() {
    super();

    this.#internals = this.attachInternals();
    this.addEventListener('invalid', this.#onInvalid);
  }

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #internals: ElementInternals;

  #textareaRef = createRef<HTMLTextAreaElement>();

  // is set to the textarea instead of the form.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.value.length > 0 && this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isShowValidationFeedback() {
    return (
      !this.disabled &&
      !this.readonly &&
      !this.validity.valid &&
      this.isReportValidityOrSubmit
    );
  }

  get #isInvalidCharacterLength() {
    if (!this.maxCharacterCount || this.disabled) {
      return false;
    }

    return this.value.length > this.maxCharacterCount!;
  }

  #onChange(event: Event) {
    const textAreaValue = this.#textareaRef.value?.value || '';
    this.value = textAreaValue;

    this.#onUpdateValidityState();

    // Unlike "input" events, these don't bubble. We have to manually dispatch them.
    this.dispatchEvent(new Event(event.type, event));
  }

  #onInput() {
    const textAreaValue = this.#textareaRef.value?.value || '';
    this.value = textAreaValue;
    this.#internals.setFormValue(this.value);

    this.#onUpdateValidityState();
  }

  #onInvalid(event: Event) {
    event.preventDefault();

    if (!this.isCheckingValidity) {
      this.isCheckingValidity = false;
      this.isReportValidityOrSubmit = true;
    }
  }

  async #onUpdateValidityState() {
    const textareaElement = this.#textareaRef.value;

    if (this.#isInvalidCharacterLength) {
      this.#internals.setValidity(
        {
          ...textareaElement?.validity,
          tooLong: true,
        },
        ' ',
        textareaElement,
      );
    } else {
      this.#internals.setValidity(
        textareaElement?.validity,
        textareaElement?.validationMessage,
        textareaElement,
      );
    }

    await this.updateComplete;
  }
}
