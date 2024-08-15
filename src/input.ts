import './icon-button.js';
import './label.js';
import { LitElement, html, nothing } from 'lit';
import { LocalizeController } from './library/localize.js';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import magnifyingGlassIcon from './icons/magnifying-glass.js';
import styles from './input.styles.js';

declare global {
  interface HTMLElementTagNameMap {
    'glide-core-input': GlideCoreInput;
  }
}

/*
 * A selection of `type` attributes that align with native that we support
 * with our component.
 * https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
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
 * @description An input with a label and optional description and tooltip. Participates in forms and validation via `FormData` and various methods.
 *
 * @event change - (same as native input's `change` event)
 * @event input - (same as native input's `input` event)

 * @slot tooltip - Content for the tooltip.
 * @slot description - Additional information or context.
 * @slot prefix - An optional icon slot to display before the input.
 * @slot suffix - An optional icon slot to display after the input.
 */
@customElement('glide-core-input')
export default class GlideCoreInput extends LitElement {
  static formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    mode: 'closed',
    delegatesFocus: true,
  };

  static override styles = styles;

  @property()
  type: SupportedTypes = 'text';

  @property({ reflect: true })
  name?: string;

  // `value` is intentionally not reflected here to match native
  @property()
  value = '';

  @property()
  label?: string;

  @property({ attribute: 'hide-label', type: Boolean })
  hideLabel = false;

  @property({ reflect: true })
  orientation: 'horizontal' | 'vertical' = 'horizontal';

  @property()
  placeholder?: string;

  @property({ type: Boolean })
  clearable = false;

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

  /** For 'password' type, whether to show a button to toggle the password's visibility */
  @property({ attribute: 'password-toggle', type: Boolean })
  passwordToggle = false;

  @property({ reflect: true, type: Boolean })
  required = false;

  @property({ type: Boolean })
  readonly = false;

  @property({ type: Boolean })
  disabled = false;

  @property()
  privateSplit?: 'left' | 'middle';

  @property({
    type: Number,
    converter(value) {
      return value && Number.parseInt(value, 10);
    },
  })
  maxlength?: number;

  get form() {
    return this.#internals.form;
  }

  get validity() {
    if (this.required && !this.value && !this.disabled) {
      // A validation message is required but unused because we disable native validation feedback.
      // And an empty string isn't allowed. Thus a single space.
      this.#internals.setValidity(
        { valueMissing: true },
        ' ',
        this.#inputElementRef.value,
      );
    } else if (this.#isMaxCharacterCountExceeded) {
      this.#internals.setValidity(
        { tooLong: true },
        ' ',
        this.#inputElementRef.value,
      );
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity;
  }

  get willValidate() {
    return this.#internals.willValidate;
  }

  override blur() {
    this.#inputElementRef.value?.blur();
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
  }

  formAssociatedCallback() {
    this.form?.addEventListener('formdata', this.#onFormdata);
  }

  formResetCallback() {
    this.value = this.getAttribute('value') ?? '';
  }

  get hasClearIcon() {
    return Boolean(this.clearable && !this.disabled && !this.readonly);
  }

  get isClearIconVisible() {
    return Boolean(this.hasClearIcon && this.value.length > 0);
  }

  override render() {
    return html`
      <glide-core-private-label
        class=${classMap({
          left: this.privateSplit === 'left',
          middle: this.privateSplit === 'middle',
        })}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback ||
        this.#isMaxCharacterCountExceeded}
        ?hide=${this.hideLabel}
        ?required=${this.required}
      >
        <slot name="tooltip" slot="tooltip"></slot>
        <label for="input"> ${this.label} </label>

        <div
          class=${classMap({
            'input-box': true,
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
          <slot name="prefix"></slot>

          <input
            aria-describedby="meta"
            aria-invalid=${this.#isShowValidationFeedback ||
            this.#isMaxCharacterCountExceeded}
            id="input"
            type=${this.type === 'password' && this.passwordVisible
              ? 'text'
              : this.type}
            .value=${this.value}
            placeholder=${ifDefined(this.placeholder)}
            autocapitalize=${ifDefined(this.autocapitalize)}
            spellcheck=${this.spellcheck}
            ?required=${this.required}
            ?readonly=${this.readonly}
            ?disabled=${this.disabled}
            @focus=${this.#onFocus}
            @blur=${this.#onBlur}
            @change=${this.#onChange}
            @input=${this.#onInput}
            ${ref(this.#inputElementRef)}
          />

          ${this.hasClearIcon
            ? html`
                <glide-core-icon-button
                  variant="tertiary"
                  class=${classMap({
                    'clear-icon-button': true,
                    'clear-icon-button--visible': this.isClearIconVisible,
                  })}
                  data-test="clear-button"
                  label=${this.#localize.term('clearEntry', this.label!)}
                  @click=${this.#onClearClick}
                >
                  <slot name="clear-icon">
                    <!-- X icon -->
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path
                        d="M6 6L18 18"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M18 6L6 18"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </slot>
                </glide-core-icon-button>
              `
            : ''}
          ${this.type === 'password' && this.passwordToggle && !this.disabled
            ? html`
                <glide-core-icon-button
                  variant="tertiary"
                  class="password-toggle"
                  data-test="password-toggle"
                  aria-label=${this.passwordVisible
                    ? 'Hide password'
                    : 'Show password'}
                  aria-controls="input"
                  aria-expanded=${this.passwordVisible ? 'true' : 'false'}
                  @click=${this.#onPasswordToggle}
                  tabindex="-1"
                >
                  ${this.passwordVisible
                    ? // Eye icon with slash
                      html`<svg
                        aria-hidden="true"
                        width="16"
                        height="16"
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
                      </svg> `
                    : // Eye icon
                      html`<svg
                        aria-hidden="true"
                        width="16"
                        height="16"
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
                      </svg>`}
                </glide-core-icon-button>
              `
            : ''}

          <div class="suffix">
            ${this.type === 'search'
              ? magnifyingGlassIcon
              : html`<slot name="suffix"></slot>`}
          </div>
        </div>

        <div class="meta" id="meta" slot="description">
          <slot class="description" name="description"></slot>

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

                  <span class="hidden" data-test="character-count-announcement"
                    >${this.#localize.term(
                      'announcedCharacterCount',
                      this.#valueCharacterCount,
                      this.maxlength,
                    )}</span
                  >
                </div>
              `
            : nothing}
        </div>
      </glide-core-private-label>
    `;
  }

  reportValidity() {
    this.isReportValidityOrSubmit = true;

    const isValid = this.#internals.reportValidity();

    // Ensures that getters referencing this.validity?.valid update (i.e. #isShowValidationFeedback)
    this.requestUpdate();

    return isValid;
  }

  constructor() {
    super();
    this.#internals = this.attachInternals();

    // Event listeners on the host aren't great because consumers can remove them.
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

  @state() private hasFocus = false;

  @state()
  private isBlurring = false;

  @state()
  private isCheckingValidity = false;

  @state()
  private isReportValidityOrSubmit = false;

  @state()
  private passwordVisible = false;

  #inputElementRef = createRef<HTMLInputElement>();

  #internals: ElementInternals;

  #localize = new LocalizeController(this);

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
      this.maxlength && this.#valueCharacterCount > this.maxlength,
    );
  }

  get #isShowValidationFeedback() {
    return Boolean(
      !this.disabled && !this.validity?.valid && this.isReportValidityOrSubmit,
    );
  }

  #onBlur() {
    this.isBlurring = true;
    this.reportValidity();
    this.isBlurring = false;

    this.hasFocus = false;
  }

  #onChange(event: Event) {
    if (
      this.#inputElementRef.value &&
      event.target instanceof HTMLInputElement
    ) {
      this.value = this.#inputElementRef.value?.value;

      // Unlike "input" events, "change" events aren't composed. So we manually
      // dispatch them from the host.
      this.dispatchEvent(new Event(event.type, event));
    }
  }

  #onClearClick(event: MouseEvent) {
    this.value = '';
    this.dispatchEvent(new Event('clear', { bubbles: true }));
    this.#inputElementRef.value?.focus();

    event.stopPropagation();
  }

  #onFocus() {
    this.hasFocus = true;
  }

  #onInput(event: Event) {
    if (
      this.#inputElementRef.value &&
      event.target instanceof HTMLInputElement
    ) {
      this.value = this.#inputElementRef.value.value;
    }
  }

  #onPasswordToggle() {
    this.passwordVisible = !this.passwordVisible;
  }
}
