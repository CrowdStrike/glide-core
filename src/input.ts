import './icon-button.js';
import './label.js';
import { html, LitElement, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import { LocalizeController } from './library/localize.js';
import magnifyingGlassIcon from './icons/magnifying-glass.js';
import styles from './input.styles.js';
import xIcon from './icons/x.js';
import type FormControl from './library/form-control.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-input': Input;
  }
}

/**
 * @attr {string} label
 * @attr {string} [aria-controls]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|null} [aria-haspopup=null]
 * @attr {'on'|'off'|'none'|'sentences'|'words'|'characters'} [autocapitalize='on']
 * @attr {'on'|'off'} [autocomplete='on']
 * @attr {boolean} [clearable=false]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {number} [maxlength]
 * @attr {string} [name='']
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {boolean} [password-toggle=false] - For 'password' type, whether to show a button to toggle the password's visibility
 * @attr {string} [pattern='']
 * @attr {string} [placeholder]
 * @attr {boolean} [readonly=false]
 * @attr {boolean} [required=false]
 * @attr {boolean} [spellcheck=false]
 * @attr {string} [tooltip]
 * @attr {'color'|'date'|'email'|'number'|'password'|'search'|'tel'|'text'|'time'|'url'} [type='text']
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element} [prefix-icon] - An icon before the input field
 * @slot {Element} [suffix-icon] - An icon after the input field
 *
 * @fires {Event} change
 * @fires {Event} input
 * @fires {Event} invalid
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 *
 * @readonly
 * @prop {ValidityState} validity
 *
 * @method checkValidity
 * @returns boolean
 *
 * @method formAssociatedCallback
 * @method formResetCallback
 *
 * @method reportValidity
 * @returns boolean
 *
 * @method resetValidityFeedback
 *
 * @method setCustomValidity
 * @param {string} message
 *
 * @method setValidity
 * @param {ValidityStateFlags} [flags]
 * @param {string} [message]
 */
@customElement('glide-core-input')
@final
export default class Input extends LitElement implements FormControl {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: shadowRootMode,
    delegatesFocus: true,
  };

  static override styles = styles;

  @property({ reflect: true })
  @required
  label?: string;

  @property({ attribute: 'aria-controls', reflect: true })
  ariaControls?: string;

  @property({ attribute: 'aria-expanded', reflect: true })
  override ariaExpanded: 'true' | 'false' | null = null;

  @property({ attribute: 'aria-haspopup', reflect: true })
  override ariaHasPopup: 'true' | 'false' | null = null;

  @property({ reflect: true, useDefault: true })
  override autocapitalize:
    | 'on'
    | 'off'
    | 'none'
    | 'sentences'
    | 'words'
    | 'characters' = 'on';

  @property({ reflect: true, useDefault: true })
  autocomplete: 'on' | 'off' = 'on';

  @property({ reflect: true, type: Boolean })
  clearable = false;

  @property({ reflect: true, type: Boolean })
  disabled = false;

  @property({ attribute: 'hide-label', reflect: true, type: Boolean })
  hideLabel = false;

  @property({
    type: Number,
    converter(value) {
      return value && Number.parseInt(value, 10);
    },
    reflect: true,
  })
  maxlength?: number;

  @property({ reflect: true, useDefault: true })
  name = '';

  @property({ reflect: true, useDefault: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  /** For 'password' type, whether to show a button to toggle the password's visibility */
  @property({ attribute: 'password-toggle', reflect: true, type: Boolean })
  passwordToggle = false;

  @property({ reflect: true })
  placeholder?: string;

  @property({ reflect: true, useDefault: true })
  pattern: string | undefined = '';

  // Private because it's only meant to be used by Form Controls Layout.
  @property()
  privateSplit?: 'left' | 'middle' | 'right';

  @property({ reflect: true, type: Boolean })
  readonly = false;

  @property({ reflect: true, type: Boolean })
  required = false;

  // It's typed by TypeScript as a boolean. But we treat it as a string throughout.
  @property({ reflect: true, type: Boolean, useDefault: true })
  override spellcheck = false;

  @property({ reflect: true })
  tooltip?: string;

  @property({ reflect: true, useDefault: true })
  type:
    | 'color'
    | 'date'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url' = 'text';

  // Intentionally not reflected to match native.
  @property()
  value = '';

  @property({ reflect: true })
  readonly version: string = packageJson.version;

  get form(): HTMLFormElement | null {
    return this.#internals.form;
  }

  get validity(): ValidityState {
    if (this.pattern && this.pattern.length > 0) {
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        {
          customError: Boolean(this.validityMessage),
          // Empty values do not trigger a pattern mismatch error to align
          // with native behavior¹.
          //
          // When checking pattern validity like the native input element, we
          // need to ensure it matches the entire string, not just a portion of it¹.
          //
          // The regex we use internally matches native's according to the documentation².
          //
          // 1: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#constraint_validation
          // 2: https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#overview
          patternMismatch: Boolean(
            this.value &&
              !new RegExp(`^(?:${this.pattern})$`, 'v').test(this.value),
          ),
          valueMissing: Boolean(this.required && !this.value),
        },
        ' ',
        this.#inputElementRef.value,
      );

      return this.#internals.validity;
    }

    if (!this.pattern && this.#internals.validity.patternMismatch) {
      this.#internals.setValidity({});

      return this.#internals.validity;
    }

    if (this.required && !this.value && !this.disabled) {
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { customError: Boolean(this.validityMessage), valueMissing: true },
        ' ',
        this.#inputElementRef.value,
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

  checkValidity(): boolean {
    this.isCheckingValidity = true;
    const isValid = this.#internals.checkValidity();
    this.isCheckingValidity = false;

    return isValid;
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.form?.removeEventListener('formdata', this.#onFormdata);
  }

  formAssociatedCallback(): void {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback(): void {
    this.value = this.getAttribute('value') ?? '';
  }

  override render() {
    return html`
      <glide-core-private-label
        class=${classMap({
          left: this.privateSplit === 'left',
          middle: this.privateSplit === 'middle',
        })}
        label=${ifDefined(this.label)}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback ||
        this.#isMaxCharacterCountExceeded}
        ?hide=${this.hideLabel}
        ?required=${this.required}
      >
        <label for="input"> ${this.label} </label>

        <div
          class=${classMap({
            'input-container': true,
            focused: this.hasFocus,
            empty: this.value === '',
            disabled: this.disabled,
            readonly: this.readonly && !this.disabled,
            error:
              this.#isShowValidationFeedback ||
              this.#isMaxCharacterCountExceeded,
          })}
          slot="control"
        >
          <slot name="prefix-icon">
            <!--
              An icon before the input field
              @type {Element}
            -->
          </slot>

          <input
            aria-controls=${ifDefined(this.ariaControls)}
            aria-describedby="meta"
            aria-expanded=${ifDefined(this.ariaExpanded ?? undefined)}
            aria-haspopup=${ifDefined(this.ariaHasPopup ?? undefined)}
            aria-invalid=${this.#isShowValidationFeedback ||
            this.#isMaxCharacterCountExceeded}
            autocapitalize=${this.autocapitalize}
            autocomplete=${this.autocomplete}
            class="input"
            data-test="input"
            id="input"
            placeholder=${ifDefined(this.placeholder)}
            spellcheck=${this.spellcheck}
            type=${this.type === 'password' && this.passwordVisible
              ? 'text'
              : this.type}
            .value=${this.value}
            ?required=${this.required}
            ?readonly=${this.readonly}
            ?disabled=${this.disabled}
            @focus=${this.#onInputFocus}
            @blur=${this.#onInputBlur}
            @change=${this.#onInputChange}
            @input=${this.#onInputInput}
            @keydown=${this.#onInputKeydown}
            ${ref(this.#inputElementRef)}
          />

          ${this.#hasClearButton
            ? html`
                <glide-core-icon-button
                  variant="tertiary"
                  class=${classMap({
                    'clear-icon-button': true,
                    'clear-icon-button--visible': this.#isClearButtonVisible,
                  })}
                  data-test="clear-button"
                  label=${this.#localize.term(
                    'clearEntry',
                    // `this.label` is always defined because it's a required attribute.
                    //
                    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                    this.label!,
                  )}
                  @click=${this.#onClearButtonClick}
                >
                  ${xIcon}
                </glide-core-icon-button>
              `
            : nothing}
          ${this.type === 'password' && this.passwordToggle && !this.disabled
            ? html`
                <glide-core-icon-button
                  variant="tertiary"
                  class="password-toggle"
                  data-test="password-toggle"
                  label=${this.passwordVisible
                    ? 'Hide password'
                    : 'Show password'}
                  aria-controls="input"
                  aria-expanded=${this.passwordVisible ? 'true' : 'false'}
                  @click=${this.#onPasswordToggle}
                >
                  ${this.passwordVisible ? icons.eyeWithSlash : icons.eye}
                </glide-core-icon-button>
              `
            : nothing}

          <div class="suffix-icon">
            ${this.type === 'search'
              ? magnifyingGlassIcon
              : html`
                  <slot name="suffix-icon">
                    <!--
                      An icon after the input field
                      @type {Element}
                    -->
                  </slot>
                `}
          </div>
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
          >
            <!--
              Additional information or context
              @type {Element | string}
            -->
          </slot>

          ${when(
            this.#isShowValidationFeedback && this.validityMessage,
            () =>
              html`<span class="validity-message" data-test="validity-message"
                >${unsafeHTML(this.validityMessage)}</span
              >`,
          )}
          ${this.maxlength
            ? html`
                <div
                  class=${classMap({
                    'character-count': true,
                    error: this.#isMaxCharacterCountExceeded,
                  })}
                  data-test="character-count-container"
                >
                  <!--
                    "aria-hidden" is used here so that the character counter
                    is not read aloud to screenreaders twice as we have a
                    more accesible, verbose description below.
                  -->
                  <span aria-hidden="true" data-test="character-count-text">
                    ${this.#localize.term(
                      'displayedCharacterCount',
                      this.#valueCharacterCount,
                      this.maxlength,
                    )}
                  </span>

                  <span class="hidden" data-test="character-count-announcement">
                    ${this.#localize.term(
                      'announcedCharacterCount',
                      this.#valueCharacterCount,
                      this.maxlength,
                    )}
                  </span>
                </div>
              `
            : nothing}
        </div>
      </glide-core-private-label>
    `;
  }

  reportValidity(): boolean {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing `this.validity.valid` are updated.
    this.requestUpdate();

    return isValid;
  }

  resetValidityFeedback(): void {
    this.isReportValidityOrSubmit = false;
  }

  setCustomValidity(message: string): void {
    this.validityMessage = message;

    if (message === '') {
      this.#internals.setValidity(
        { customError: false },
        '',
        this.#inputElementRef.value,
      );
    } else {
      // A validation message is required but unused because we disable native validation
      // feedback. And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        {
          customError: true,
          patternMismatch: this.#internals.validity.patternMismatch,
          valueMissing: this.#internals.validity.valueMissing,
        },
        ' ',
        this.#inputElementRef.value,
      );
    }
  }

  setValidity(flags?: ValidityStateFlags, message?: string): void {
    this.validityMessage = message;

    // A validation message is required but unused because we disable native validation
    // feedback. And an empty string isn't allowed. Thus a single space.
    this.#internals.setValidity(flags, ' ', this.#inputElementRef.value);
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event handlers on the host aren't great because consumers can remove them.
    // Unfortunately, the host is the only thing on which this event is dispatched
    // because it's the host that is form-associated.
    this.addEventListener('invalid', (event) => {
      event?.preventDefault(); // Canceled so a native validation message isn't shown.

      // We only want to focus the input if the "invalid" event resulted from either:
      //
      // 1. A form submission.
      // 2. A call of `reportValidity()` that did not result from the input's "blur"
      //    event.
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
  private hasFocus = false;

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  @state()
  private passwordVisible = false;

  @state()
  private validityMessage?: string;

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #localize = new LocalizeController(this);

  get #hasClearButton() {
    return this.clearable && !this.disabled && !this.readonly;
  }

  get #isClearButtonVisible() {
    return this.#hasClearButton && this.value.length > 0;
  }

  get #valueCharacterCount() {
    return this.value.length;
  }

  #onFormdata = ({ formData }: FormDataEvent) => {
    if (this.name && this.value && !this.disabled) {
      formData.append(this.name, this.value);
    }
  };

  get #isMaxCharacterCountExceeded() {
    return Boolean(
      !this.disabled &&
        !this.readonly &&
        this.maxlength &&
        this.#valueCharacterCount > this.maxlength,
    );
  }

  get #isShowValidationFeedback() {
    return (
      !this.disabled && !this.validity?.valid && this.isReportValidityOrSubmit
    );
  }

  #onClearButtonClick(event: MouseEvent) {
    this.value = '';
    this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    this.#inputElementRef.value?.focus();

    event.stopPropagation();
  }

  #onInputBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;

    this.hasFocus = false;
  }

  #onInputChange() {
    if (this.#inputElementRef.value?.value) {
      this.value = this.#inputElementRef.value?.value;
    }

    // Unlike "input" events, "change" events aren't composed. So we have to
    // manually dispatch them.
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  #onInputFocus() {
    this.hasFocus = true;
  }

  #onInputInput() {
    if (this.#inputElementRef.value) {
      this.value = this.#inputElementRef.value.value;
    }
  }

  #onInputKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.form?.requestSubmit();
    }
  }

  #onPasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
}

const icons = {
  eye: html`<svg
    aria-hidden="true"
    style=${styleMap({
      height: '1rem',
      width: '1rem',
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
    />
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
    />
  </svg>`,
  eyeWithSlash: html`<svg
    aria-hidden="true"
    style=${styleMap({
      height: '1rem',
      width: '1rem',
    })}
    fill="none"
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
    />
  </svg>`,
};
