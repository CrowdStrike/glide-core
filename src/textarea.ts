import './label.js';
import { LitElement, html, nothing } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import ow from './library/ow.js';
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

  @property()
  privateSplit?: 'left' | 'middle';

  override blur() {
    this.#textareaElementRef.value?.blur();
  }

  checkValidity() {
    this.isCheckingValidity = true;
    const validity = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return validity;
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
      split=${ifDefined(this.privateSplit ?? undefined)}
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
          aria-invalid=${this.#isShowValidationFeedback ||
          this.#isInvalidCharacterLength}
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
          @blur=${this.#onBlur}
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

        ${this.maxlength
          ? html`<div
              class=${classMap({
                'character-count': true,
                error: this.#isInvalidCharacterLength,
              })}
            >
              <span aria-hidden="true" data-test="character-count-text">
                ${this.#localize.term(
                  'displayedCharacterCount',
                  this.value.length,
                  this.maxlength,
                )}
              </span>

              <span class="hidden" data-test="character-count-announcement"
                >${this.#localize.term(
                  'announcedCharacterCount',
                  this.value.length,
                  this.maxlength,
                )}</span
              >
            </div>`
          : nothing}
      </div></glide-core-label
    >`;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
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
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  #internals: ElementInternals;

  #localize = new LocalizeController(this);

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

  #onBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;
  }

  #onChange(event: Event) {
    ow(
      this.#textareaElementRef.value,
      ow.object.instanceOf(HTMLTextAreaElement),
    );

    const textAreaValue = this.#textareaElementRef.value.value;
    this.value = textAreaValue;

    this.#onUpdateValidityState();

    // Unlike "input" events, these don't bubble. We have to manually dispatch them.
    this.dispatchEvent(new Event(event.type, event));
  }

  #onInput() {
    ow(
      this.#textareaElementRef.value,
      ow.object.instanceOf(HTMLTextAreaElement),
    );

    const textAreaValue = this.#textareaElementRef.value.value;
    this.value = textAreaValue;
    this.#internals.setFormValue(this.value);

    this.#onUpdateValidityState();
  }

  #onInvalid(event: Event) {
    event?.preventDefault(); // Canceled so a native validation message isn't shown.

    // We only want to focus the textarea if the invalid event resulted from either:
    // 1. Form submission
    // 2. a call to reportValidity that did NOT result from the textarea blur event

    if (this.isCheckingValidity || this.isBlurring) {
      return;
    }

    this.isReportValidityOrSubmit = true;

    const isFirstInvalidFormElement =
      this.form?.querySelector(':invalid') === this;

    if (isFirstInvalidFormElement) {
      // - `this.#internals.delegatesFocus` is preferred because it's declarative. But
      //    it's limited to focusing the first focusable element. That doesn't work for
      //    us because our first focusable element is the tooltip when it's present.
      //
      // - Canceling this event means the textarea won't get focus, even if we were to use
      //   `this.#internals.delegatesFocus`.
      //
      // - The browser will ignore this if textarea isn't the first invalid form control.
      //
      // TODO
      // Try passing `focusVisible` after browsers support it. It may prevent the issue
      // where the textarea itself has a focus outline after this call.
      //
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
      this.focus();
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
