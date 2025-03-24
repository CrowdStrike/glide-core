var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {'on'|'off'|'none'|'sentences'|'words'|'characters'} [autocapitalize='on']
 * @attr {'on'|'off'} [autocomplete='on']
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {number} [maxlength]
 * @attr {string} [name='']
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {string} [placeholder='']
 * @attr {boolean} [readonly=false]
 * @attr {boolean} [required=false]
 * @attr {boolean} [spellcheck=false]
 * @attr {string} [tooltip]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 *
 * @fires {Event} change
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
let GlideCoreTextarea = class GlideCoreTextarea extends LitElement {
    static { this.formAssociated = true; }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
        delegatesFocus: true,
    }; }
    static { this.styles = styles; }
    checkValidity() {
        this.isCheckingValidity = true;
        const isValid = this.#internals.checkValidity();
        this.isCheckingValidity = false;
        return isValid;
    }
    disconnectedCallback() {
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
            this.#internals.setValidity({ customError: Boolean(this.validityMessage), valueMissing: true }, ' ', this.#textareaElementRef.value);
            return this.#internals.validity;
        }
        if (this.required && this.#internals.validity.valueMissing && this.value) {
            this.#internals.setValidity({});
            return this.#internals.validity;
        }
        if (!this.required &&
            this.#internals.validity.valueMissing &&
            !this.value) {
            this.#internals.setValidity({});
            return this.#internals.validity;
        }
        return this.#internals.validity;
    }
    formAssociatedCallback() {
        this.form?.addEventListener('formdata', this.#onFormdata);
    }
    formResetCallback() {
        this.value = this.getAttribute('value') ?? '';
    }
    render() {
        return html `<glide-core-private-label
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
            error: this.#isShowValidationFeedback ||
                this.#isMaxCharacterCountExceeded,
        })}
          data-test="textarea"
          id="textarea"
          name=${ifDefined(this.name)}
          placeholder=${ifDefined(this.placeholder)}
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
            hidden: Boolean(this.#isShowValidationFeedback && this.validityMessage),
        })}
          name="description"
        >
          <!--
            Additional information or context
            @type {Element | string}
          -->
        </slot>

        ${when(this.#isShowValidationFeedback && this.validityMessage, () => html `<span class="validity-message" data-test="validity-message"
              >${unsafeHTML(this.validityMessage)}</span
            >`)}
        ${this.maxlength
            ? html `<div
              class=${classMap({
                'character-count': true,
                error: this.#isMaxCharacterCountExceeded,
            })}
              data-test="character-count-container"
            >
              <span aria-hidden="true" data-test="character-count-text">
                ${this.#localize.term('displayedCharacterCount', this.#valueCharacterCount, this.maxlength)}
              </span>

              <span class="hidden" data-test="character-count-announcement"
                >${this.#localize.term('announcedCharacterCount', this.#valueCharacterCount, this.maxlength)}</span
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
    setCustomValidity(message) {
        this.validityMessage = message;
        if (message === '') {
            this.#internals.setValidity({ customError: false }, '', this.#textareaElementRef.value);
        }
        else {
            this.#internals.setValidity({
                customError: true,
                valueMissing: this.#internals.validity.valueMissing,
            }, ' ', this.#textareaElementRef.value);
        }
    }
    setValidity(flags, message) {
        this.validityMessage = message;
        this.#internals.setValidity(flags, ' ', this.#textareaElementRef.value);
    }
    constructor() {
        super();
        // Intentionally not reflected to match native.
        this.value = '';
        this.hideLabel = false;
        this.orientation = 'horizontal';
        this.placeholder = '';
        this.required = false;
        this.readonly = false;
        this.disabled = false;
        this.name = '';
        // It's typed by TypeScript as a boolean. But we treat it as a string throughout.
        this.spellcheck = false;
        this.autocapitalize = 'on';
        this.autocomplete = 'on';
        this.version = packageJson.version;
        this.isBlurring = false;
        this.isCheckingValidity = false;
        this.isReportValidityOrSubmit = false;
        this.#localize = new LocalizeController(this);
        this.#textareaElementRef = createRef();
        // An arrow function field instead of a method so `this` is closed over and
        // set to the component instead of `document`.
        this.#onFormdata = ({ formData }) => {
            if (this.name && this.value && !this.disabled) {
                formData.append(this.name, this.value);
            }
        };
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
            const isFirstInvalidFormElement = this.form?.querySelector(':invalid') === this;
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
    #internals;
    #localize;
    #textareaElementRef;
    // An arrow function field instead of a method so `this` is closed over and
    // set to the component instead of `document`.
    #onFormdata;
    get #isShowValidationFeedback() {
        return (!this.disabled &&
            !this.readonly &&
            !this.validity.valid &&
            this.isReportValidityOrSubmit);
    }
    get #valueCharacterCount() {
        return this.value.length;
    }
    get #isMaxCharacterCountExceeded() {
        return Boolean(!this.disabled &&
            !this.readonly &&
            this.maxlength &&
            this.#valueCharacterCount > this.maxlength);
    }
    #onTextareaBlur() {
        this.isBlurring = true;
        this.reportValidity();
        this.isBlurring = false;
    }
    #onTextareaChange() {
        if (this.#textareaElementRef.value) {
            this.value = this.#textareaElementRef.value.value;
        }
        // Unlike "input" events, "change" events aren't composed. So we have to
        // manually dispatch them.
        this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
    }
    #onTextareaInput() {
        if (this.#textareaElementRef.value) {
            this.value = this.#textareaElementRef.value.value;
        }
    }
    #onTextareaKeydown(event) {
        if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
            this.form?.requestSubmit();
        }
    }
};
__decorate([
    property()
], GlideCoreTextarea.prototype, "value", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreTextarea.prototype, "label", void 0);
__decorate([
    property({ attribute: 'hide-label', reflect: true, type: Boolean })
], GlideCoreTextarea.prototype, "hideLabel", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "orientation", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "placeholder", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreTextarea.prototype, "required", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreTextarea.prototype, "readonly", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreTextarea.prototype, "disabled", void 0);
__decorate([
    property({
        type: Number,
        converter(value) {
            return value && Number.parseInt(value, 10);
        },
        reflect: true,
    })
], GlideCoreTextarea.prototype, "maxlength", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "name", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreTextarea.prototype, "spellcheck", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "autocapitalize", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "autocomplete", void 0);
__decorate([
    property()
], GlideCoreTextarea.prototype, "privateSplit", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "tooltip", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreTextarea.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreTextarea.prototype, "isBlurring", void 0);
__decorate([
    state()
], GlideCoreTextarea.prototype, "isCheckingValidity", void 0);
__decorate([
    state()
], GlideCoreTextarea.prototype, "isReportValidityOrSubmit", void 0);
__decorate([
    state()
], GlideCoreTextarea.prototype, "validityMessage", void 0);
GlideCoreTextarea = __decorate([
    customElement('glide-core-textarea'),
    final
], GlideCoreTextarea);
export default GlideCoreTextarea;
