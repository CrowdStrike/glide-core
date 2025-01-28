import './label.js';
import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import styles from './textarea.styles.js';
import type FormControl from './library/form-control.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-textarea': GlideCoreTextarea;
  }
}

/**
 * @event change
 * @event input
 * @event invalid
 *
 * @slot description - Additional information or context.
 */
@customElement('glide-core-textarea')
@final
export default class GlideCoreTextarea
  extends LitElement
  implements FormControl
{
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
    delegatesFocus: true,
  };

  static override styles = styles;

  // Intentionally not reflected to match native.
  @property()
  value = '';

  @property({ reflect: true })
  label?: string = '';

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property({ reflect: true })
  placeholder?: string = '';

  @property({ reflect: true, type: Number })
  rows = 2;

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ reflect: true, type: Boolean })
  readonly = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({
    type: Number,
    converter(value) {
      return value && Number.parseInt(value, 10);
    },
    reflect: true,
  })
  maxlength?: number;

  @property({ reflect: true })
  name = '';

  // It's typed by TypeScript as a boolean. But we treat it as a string throughout.
  @property({ reflect: true, type: Boolean })
  override spellcheck = false;

  @property({ reflect: true })
  override autocapitalize:
    | 'on'
    | 'off'
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters' = 'on';

  @property({ reflect: true })
  autocomplete: 'on' | 'off' = 'on';

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle';

  @property({ reflect: true })
  tooltip?: string;

  @property({ reflect: true })
  readonly version = packageJson.version;

  override blur() {
    this.#textareaElementRef.value?.blur();
  }

  checkValidity() {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();

    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  get form() {
    return this.#internals.form;
  }

  get validity() {
    if (this.required && !this.value && !this.disabled) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#textareaElementRef.value,
      );

      return this.#internals.validity;
    }

    if (this.required && this.#internals.validity.valueMissing && this.value) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

    if (
      !this.required &&
      this.#internals.validity.valueMissing &&
      !this.value
    ) {
      this.#internals.setValidity({});
      return this.#internals.validity;
    }

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
    return html`<glide-core-private-label
      label=${ifDefined(this.label)}
      split=${ifDefined(this.privateSplit ?? undefined)}
      tooltip=${ifDefined(this.tooltip)}
      orientation=${this.orientation}
      ?disabled=${this.disabled}
      ?error=${this.#isShowValidationFeedback ||
      this.#isMaxCharacterCountExceeded}
      ?hide=${this.hideLabel}
      ?required=${this.required}
    >
      <label class="label" for="textarea">${this.label}</label>

      <div class="textarea-container" slot="control">
        <textarea
          aria-describedby="meta"
          aria-invalid=${this.#isShowValidationFeedback ||
          this.#isMaxCharacterCountExceeded}
          class=${classMap({
            error:
              this.#isShowValidationFeedback ||
              this.#isMaxCharacterCountExceeded,
          })}
          id="textarea"
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
          rows=${this.rows}
          autocapitalize=${this.autocapitalize}
          autocomplete=${this.autocomplete}
          spellcheck=${this.spellcheck}
          .value=${this.value}
          ?required=${this.required}
          ?readonly=${this.readonly}
          ?disabled=${this.disabled}
          ${ref(this.#textareaElementRef)}
          @blur=${this.#onTextareaBlur}
          @change=${this.#onTextareaChange}
          @input=${this.#onTextareaInput}
          @keydown=${this.#onTextareaKeydown}
        >
        </textarea>
      </div>

      <div class="meta" id="meta" slot="description">
        <slot
          class=${classMap({
            description: true,
            hidden: Boolean(
              this.#isShowValidationFeedback && this.validityMessage,
            ),
          })}
          name="description"
        ></slot>

        ${when(
          this.#isShowValidationFeedback && this.validityMessage,
          () =>
            html`<span class="validity-message" data-test="validity-message"
              >${unsafeHTML(this.validityMessage)}</span
            >`,
        )}
        ${this.maxlength
          ? html`<div
              class=${classMap({
                'character-count': true,
                error: this.#isMaxCharacterCountExceeded,
              })}
              data-test="character-count-container"
            >
              <span aria-hidden="true" data-test="character-count-text">
                ${this.#localize.term(
                  'displayedCharacterCount',
                  this.#valueCharacterCount,
                  this.maxlength,
                )}
              </span>
              <span class="hidden" data-test="character-count-announcement"
                >${this.#localize.term(
                  'announcedCharacterCount',
                  this.#valueCharacterCount,
                  this.maxlength,
                )}</span
              >
            </div>`
          : nothing}
      </div></glide-core-private-label
    >`;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback() {
    this.isReportValidityOrSubmit = false;
  }

  setCustomValidity(message: string) {
    this.validityMessage = message;

    if (message === '') {
      this.#internals.setValidity(
        { customError: false },
        '',
        this.#textareaElementRef.value,
      );
    } else {
      this.#internals.setValidity(
        {
          customError: true,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#textareaElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string) {
    this.validityMessage = message;

    this.#internals.setValidity(flags, ' ', this.#textareaElementRef.value);
  }

  constructor() {
    super();

    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the input if the invalid event resulted from either:
      // 1. Form submission
      // 2. a call to reportValidity that did NOT result from the input blur event
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
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  @state()
  private validityMessage?: string;

  #internals: ElementInternals;

  #localize = new LocalizeController(this);

  #textareaElementRef = createRef<HTMLTextAreaElement>();

  // An arrow function field instead of a method so `this` is closed over and
  // set to the component instead of `document`.
  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value && !this.disabled) {
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

  get #valueCharacterCount() {
    return this.value.length;
  }

  get #isMaxCharacterCountExceeded() {
    return Boolean(
      !this.disabled &&
        !this.readonly &&
        this.maxlength &&
        this.#valueCharacterCount > this.maxlength,
    );
  }

  #onTextareaBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;
  }

  #onTextareaChange(event: Event) {
    if (this.#textareaElementRef.value) {
      this.value = this.#textareaElementRef.value.value;
    }

    // Unlike "input" events, "change" events aren't composed. So we have to
    // manually dispatch them.
    this.dispatchEvent(
      new Event(event.type, { bubbles: true, composed: true }),
    );
  }

  #onTextareaInput() {
    if (this.#textareaElementRef.value) {
      this.value = this.#textareaElementRef.value.value;
    }
  }

  #onTextareaKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
      this.form?.requestSubmit();
    }
  }
}
