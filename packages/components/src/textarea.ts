import './label.js';
import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';
import styles from './textarea.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-textarea': GlideCoreTextarea;
  }
}

/**
 * @description A textarea with a label and optional description and toolip. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - (same as native textarea's `change` event)
 * @event input - (same as native textarea's `input` event)
 *
 * @slot tooltip - Content for the tooltip.
 * @slot description - Additional information or context.
 */
@customElement('glide-core-textarea')
export default class GlideCoreTextarea extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
    delegatesFocus: true,
  };

  static override styles = styles;

  @property()
  value = '';

  @property()
  label?: string = '';

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel? = false;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property()
  placeholder?: string = '';

  @property({ reflect: true, type: Number })
  rows = 2;

  @property({ type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property({
    type: Number,
    converter(value) {
      return value && Number.parseInt(value, 10);
    },
  })
  maxlength?: number;

  @property({ reflect: true })
  name?: string;

  // It's typed by TypeScript as a boolean. But we treat it as a string throughout.
  @property({ type: Boolean })
  override spellcheck = false;

  @property()
  override autocapitalize:
    | 'on'
    | 'off'
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters' = 'on';

  override blur() {
    this.#textareaElementRef.value?.blur();
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

  get form() {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  override render() {
    return html`<glide-core-label
      orientation=${this.orientation}
      ?disabled=${this.disabled}
      ?error=${this.#isShowValidationFeedback || this.#isInvalidCharacterLength}
      ?hide=${this.hideLabel}
      ?required=${this.required}
    >
      <slot name="tooltip" slot="tooltip"></slot>

      <label class="label" for="textarea"> ${this.label} </label>

      <div class="textarea-container" slot="control">
        <textarea
          class=${classMap({
            error:
              this.#isShowValidationFeedback || this.#isInvalidCharacterLength,
          })}
          id="textarea"
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
          rows=${this.rows}
          autocapitalize=${ifDefined(this.autocapitalize)}
          spellcheck=${this.spellcheck}
          ?required=${this.required}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          aria-describedby="meta"
          ${ref(this.#textareaElementRef)}
          @input=${this.#onInput}
          @change=${this.#onChange}
        >
        </textarea>
      </div>

      <div
        class="meta"
        data-test-description-container
        id="meta"
        slot="description"
      >
        <slot name="description"></slot>

        ${when(
          this.maxlength,
          () =>
            html`<div
              class=${classMap({
                'character-count': true,
                error: this.#isInvalidCharacterLength,
              })}
              data-test-maxlength
            >
              ${this.value.length}/${this.maxlength}
            </div>`,
        )}
      </div></glide-core-label
    >`;
  }

  reportValidity() {
    return this.#internals.reportValidity();
  }

  override updated() {
    if (this.#textareaElementRef.value) {
      this.#textareaElementRef.value.value = this.value;
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

  #textareaElementRef = createRef<HTMLTextAreaElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
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
    if (!this.maxlength || this.disabled) {
      return false;
    }

    return this.value.length > this.maxlength;
  }

  #onChange(event: Event) {
    const textAreaValue = this.#textareaElementRef.value!.value;
    this.value = textAreaValue;

    this.#onUpdateValidityState();

    // Unlike "input" events, these don't bubble. We have to manually dispatch them.
    this.dispatchEvent(new Event(event.type, event));
  }

  #onInput() {
    const textAreaValue = this.#textareaElementRef.value!.value;
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
    const textareaElement = this.#textareaElementRef.value;

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
