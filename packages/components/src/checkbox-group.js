var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import './label.js';
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { createRef, ref } from 'lit/directives/ref.js';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import packageJson from '../package.json' with { type: 'json' };
import GlideCoreCheckbox from './checkbox.js';
import styles from './checkbox-group.styles.js';
import assertSlot from './library/assert-slot.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {string} [name='']
 * @attr {'horizontal'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 * @attr {string[]} [value=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreCheckbox}
 * @slot {Element | string} [description] - Additional information or context
 *
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
let GlideCoreCheckboxGroup = class GlideCoreCheckboxGroup extends LitElement {
    static { this.formAssociated = true; }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get disabled() {
        return this.#isDisabled;
    }
    set disabled(isDisabled) {
        this.#isDisabled = isDisabled;
        for (const checkbox of this.#checkboxElements) {
            checkbox.disabled = isDisabled;
        }
    }
    /**
     * @default false
     */
    get required() {
        return this.#isRequired;
    }
    set required(isRequired) {
        this.#isRequired = isRequired;
        // Changes to `required` change the validity state. If no checkboxes are
        // checked and Checkbox Group is `required`, then Checkbox Group is invalid.
        //
        // However, if `required` is programmatically removed, then Checkbox Group
        // is suddenly valid. So we update the validity of every checkbox to match
        // Checkbox Group. This ensures that any visual feedback shown by Checkbox
        // based on validity is correct.
        for (const checkbox of this.#checkboxElements) {
            if (isRequired) {
                checkbox.setValidity(this.#internals.validity, ' ');
            }
            else {
                checkbox.setValidity({});
            }
            // Checkbox's `this.#internals.validity` isn't reactive.
            checkbox.requestUpdate();
        }
    }
    /**
     * @default []
     */
    get value() {
        return this.#value;
    }
    set value(value) {
        this.#value = value;
        for (const checkbox of this.#checkboxElements) {
            const isChecked = value.some((value) => value !== '' && value === checkbox.value);
            // It would be simpler if we just checked and unchecked every Checkbox
            // based on whether its value is in `value`. But doing so would uncheck
            // Checkboxes that don't have a value but have nonetheless been checked
            // by the user. Doing it this way ensures we change as little state as
            // possible that isn't ours to change.
            if (isChecked) {
                checkbox.checked = true;
            }
            else if (checkbox.value) {
                checkbox.checked = false;
            }
            // We have a few options if `value` is set programmatically to include
            // the value of a disabled Checkbox. We can throw, remove the value from
            // `value`, or enable the Checkbox.
            //
            // Throwing is attractive because the inclusion of a disabled Checkbox
            // in `value` is likely a mistake, either due to bad data or developer
            // error.
            //
            // But we only throw in development. So the form will be submitted with
            // the new `value` in production regardless if it was by mistake. By enabling
            // the Checkbox, we at least ensure the user is aware of the fact that it'll
            // be included in the submission.
            if (checkbox.checked && checkbox.disabled) {
                checkbox.disabled = false;
            }
        }
    }
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
    firstUpdated() {
        if (this.disabled) {
            for (const checkbox of this.#checkboxElements) {
                checkbox.disabled = true;
            }
        }
        const hasNoCheckedCheckboxes = this.#checkboxElements.every(({ checked }) => !checked);
        for (const checkbox of this.#checkboxElements) {
            checkbox.privateVariant = 'minimal';
            checkbox.addEventListener('blur', this.#onCheckboxBlur.bind(this));
            // When `value` is set on initial render, its setter is called before
            // `connectedCallback()` and thus before the default slot has any assigned
            // elements. So we set it again here after the initial render is complete
            // so `this.#checkboxElements` isn't empty.
            //
            // Additionally, `#onDefaultSlotChange()` is called after `firstUpdated()`
            // and sets `value` based on which checkboxes are checked. And the initial `value`
            // may conflict with the one derived from which checkboxes are checked.
            //
            // So we have a decision to make. On first render, do we defer to the initial
            // `value` and check and uncheck checkboxes below? Or do we defer to `#onDefaultSlotChange()`
            // and let that method change `value` from its initial value based on which checkboxes
            // are checked?
            //
            // It's largely a toss-up. But the latter seems like the logical choice given
            // `#onDefaultSlotChange()` is called after `firstUpdated()`. In other words, we
            // defer to the lifecycle. `#onDefaultSlotChange()` is called second. So it gets to
            // override what `value` was initially.
            //
            // If no checkboxes are checked, then it's obvious that the consumer's intention is
            // to check checkboxes based on the initial `value` and that the initial `value` is
            // the intended one. So we proceed.
            if (hasNoCheckedCheckboxes) {
                checkbox.checked = this.value.includes(checkbox.value);
                if (checkbox.checked && !this.disabled) {
                    checkbox.disabled = false;
                }
            }
        }
    }
    get form() {
        return this.#internals.form;
    }
    get validity() {
        const isChecked = this.#checkboxElements.some(({ checked }) => checked);
        if (this.required && !isChecked) {
            // A validation message is required but unused because we disable native validation feedback.
            // And an empty string isn't allowed. Thus a single space.
            this.#internals.setValidity({ customError: Boolean(this.validityMessage), valueMissing: true }, ' ', this.#componentElementRef.value);
        }
        if (this.required && this.#internals.validity.valueMissing && isChecked) {
            this.#internals.setValidity({});
        }
        if (!this.required && this.#internals.validity.valueMissing && !isChecked) {
            this.#internals.setValidity({});
        }
        for (const checkbox of this.#checkboxElements) {
            checkbox.setValidity(this.#internals.validity, ' ');
            // Checkbox's `this.#internals.validity` isn't reactive.
            checkbox.requestUpdate();
        }
        return this.#internals.validity;
    }
    focus(options) {
        const checkbox = this.#checkboxElements.find(({ disabled }) => !disabled);
        checkbox?.focus(options);
    }
    formAssociatedCallback() {
        this.form?.addEventListener('formdata', this.#onFormdata);
    }
    formResetCallback() {
        for (const checkbox of this.#checkboxElements) {
            checkbox.formResetCallback();
        }
    }
    render() {
        return html `<div
      class="component"
      data-test="component"
      ${ref(this.#componentElementRef)}
    >
      <glide-core-private-label
        label=${ifDefined(this.label)}
        orientation=${this.orientation}
        split=${ifDefined(this.privateSplit ?? undefined)}
        tooltip=${ifDefined(this.tooltip)}
        ?hide=${this.hideLabel}
        ?disabled=${this.disabled}
        ?error=${this.#isShowValidationFeedback}
        ?required=${this.required}
      >
        <label id="label">${this.label}</label>

        <!-- "aria-describedby" is more appropriate for a description but isn't read by VoiceOver. -->
        <div
          aria-labelledby="label description"
          role="group"
          slot="control"
          class=${classMap({
            'checkbox-container': true,
            invalid: this.#isShowValidationFeedback,
        })}
        >
          <slot
            class="default-slot"
            @change=${this.#onCheckboxChange}
            @private-value-change=${this.#onCheckboxesValueChange}
            @slotchange=${this.#onDefaultSlotChange}
            ${assertSlot([GlideCoreCheckbox])}
            ${ref(this.#defaultSlotElementRef)}
          >
            <!--
              @type {GlideCoreCheckbox}
              @required
            -->
          </slot>
        </div>

        <div id="description" slot="description">
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
        </div>
      </glide-core-private-label>
    </div>`;
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
            this.#internals.setValidity({ customError: false }, '', this.#componentElementRef.value);
        }
        else {
            // A validation message is required but unused because we disable native validation feedback.
            // And an empty string isn't allowed. Thus a single space.
            this.#internals.setValidity({
                customError: true,
                valueMissing: this.#internals.validity.valueMissing,
            }, ' ', this.#componentElementRef.value);
        }
    }
    setValidity(flags, message) {
        this.validityMessage = message;
        // A validation message is required but unused because we disable native validation feedback.
        // And an empty string isn't allowed. Thus a single space.
        this.#internals.setValidity(flags, ' ', this.#componentElementRef.value);
    }
    constructor() {
        super();
        this.hideLabel = false;
        this.name = '';
        this.orientation = 'horizontal';
        this.version = packageJson.version;
        this.isBlurring = false;
        this.isCheckingValidity = false;
        this.isReportValidityOrSubmit = false;
        this.#componentElementRef = createRef();
        this.#defaultSlotElementRef = createRef();
        this.#isDisabled = false;
        this.#isRequired = false;
        this.#value = [];
        // An arrow function field instead of a method so `this` is closed over and
        // set to the component instead of the form.
        this.#onFormdata = ({ formData }) => {
            if (this.name && this.value.length > 0 && !this.disabled) {
                formData.append(this.name, JSON.stringify(this.value));
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
                // - The browser will ignore this if Checkbox isn't the first invalid form control.
                //
                // TODO
                // Try passing `focusVisible` after browsers support it. It may prevent the issue
                // where the checkbox itself has a focus outline after this call.
                //
                // https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#focusvisible
                this.focus();
            }
        });
    }
    #componentElementRef;
    #defaultSlotElementRef;
    #internals;
    #isDisabled;
    #isRequired;
    #value;
    get #checkboxElements() {
        return this.#defaultSlotElementRef.value
            ? this.#defaultSlotElementRef.value
                .assignedElements()
                .filter((element) => {
                return element instanceof GlideCoreCheckbox;
            })
            : [];
    }
    // An arrow function field instead of a method so `this` is closed over and
    // set to the component instead of the form.
    #onFormdata;
    get #isShowValidationFeedback() {
        return (!this.disabled && !this.validity.valid && this.isReportValidityOrSubmit);
    }
    #onBlur() {
        for (const checkbox of this.#checkboxElements) {
            checkbox.privateIsReportValidityOrSubmit = true;
        }
    }
    #onCheckboxBlur(event) {
        const newlyFocusedElement = event.relatedTarget;
        if (!newlyFocusedElement ||
            !(newlyFocusedElement instanceof GlideCoreCheckbox) ||
            !this.#checkboxElements.includes(newlyFocusedElement)) {
            this.#onBlur();
        }
    }
    #onCheckboxChange(event) {
        if (event.target instanceof GlideCoreCheckbox &&
            event.target.checked &&
            event.target.value) {
            this.value = [...this.value, event.target.value];
        }
        else if (event.target instanceof GlideCoreCheckbox &&
            !event.target.checked) {
            this.value = this.value.filter((value) => {
                return (event.target instanceof GlideCoreCheckbox &&
                    value !== event.target.value);
            });
        }
    }
    #onCheckboxesValueChange(event) {
        if (event.target instanceof GlideCoreCheckbox &&
            event.target.checked &&
            event.detail.new) {
            this.value = this.#value.map((value) => {
                return value === event.detail.old ? event.detail.new : value;
            });
        }
        else if (event.target instanceof GlideCoreCheckbox &&
            event.target.checked) {
            this.value = this.#value.filter((value) => value !== event.detail.old);
        }
    }
    #onDefaultSlotChange() {
        this.#value = this.#checkboxElements
            .filter(({ checked, disabled, value }) => checked && !disabled && value !== '')
            .map(({ value }) => value);
    }
};
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreCheckboxGroup.prototype, "disabled", null);
__decorate([
    property({ attribute: 'hide-label', type: Boolean })
], GlideCoreCheckboxGroup.prototype, "hideLabel", void 0);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreCheckboxGroup.prototype, "label", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreCheckboxGroup.prototype, "name", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreCheckboxGroup.prototype, "orientation", void 0);
__decorate([
    property()
], GlideCoreCheckboxGroup.prototype, "privateSplit", void 0);
__decorate([
    property({ reflect: true, type: Boolean })
], GlideCoreCheckboxGroup.prototype, "required", null);
__decorate([
    property({ reflect: true })
], GlideCoreCheckboxGroup.prototype, "summary", void 0);
__decorate([
    property({ reflect: true })
], GlideCoreCheckboxGroup.prototype, "tooltip", void 0);
__decorate([
    property({ reflect: true, type: Array })
], GlideCoreCheckboxGroup.prototype, "value", null);
__decorate([
    property({ reflect: true })
], GlideCoreCheckboxGroup.prototype, "version", void 0);
__decorate([
    state()
], GlideCoreCheckboxGroup.prototype, "isBlurring", void 0);
__decorate([
    state()
], GlideCoreCheckboxGroup.prototype, "isCheckingValidity", void 0);
__decorate([
    state()
], GlideCoreCheckboxGroup.prototype, "isReportValidityOrSubmit", void 0);
__decorate([
    state()
], GlideCoreCheckboxGroup.prototype, "validityMessage", void 0);
GlideCoreCheckboxGroup = __decorate([
    customElement('glide-core-checkbox-group'),
    final
], GlideCoreCheckboxGroup);
export default GlideCoreCheckboxGroup;
