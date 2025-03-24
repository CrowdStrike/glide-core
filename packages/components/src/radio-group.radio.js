var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, property } from 'lit/decorators.js';
import packageJson from '../package.json' with { type: 'json' };
import styles from './radio-group.radio.styles.js';
import shadowRootMode from './library/shadow-root-mode.js';
import final from './library/final.js';
import required from './library/required.js';
/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {string} [value]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @fires {Event} change
 * @fires {Event} input
 */
let GlideCoreRadioGroupRadio = class GlideCoreRadioGroupRadio extends LitElement {
    constructor() {
        super(...arguments);
        this.version = packageJson.version;
        this.#checked = false;
        this.#disabled = false;
        this.#privateInvalid = false;
        this.#privateRequired = false;
        this.#value = '';
    }
    static { this.shadowRootOptions = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
    }; }
    static { this.styles = styles; }
    /**
     * @default false
     */
    get checked() {
        return this.#checked;
    }
    set checked(isChecked) {
        const wasChecked = this.#checked;
        this.#checked = isChecked;
        this.ariaChecked = isChecked.toString();
        if (isChecked && wasChecked !== isChecked) {
            this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
            this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
        }
        // `this.checked` can be set programmatically. Radio Group needs to know when
        // that happens so it can update its own `this.value`.
        this.dispatchEvent(new CustomEvent('private-checked-change', {
            bubbles: true,
            detail: {
                // Without knowing what the old value was, Radio Group would be unable to
                // update `this.value`.
                old: wasChecked,
                new: isChecked,
            },
        }));
    }
    /**
     * @default false
     */
    get disabled() {
        return this.#disabled;
    }
    set disabled(disabled) {
        this.#disabled = disabled;
        this.ariaDisabled = disabled.toString();
        // `this.disabled` can be changed programmatically. Radio Group needs to know when
        // that happens so it can make radios tabbable or untabbable.
        this.dispatchEvent(new CustomEvent('private-disabled-change', {
            bubbles: true,
        }));
    }
    // Private because it's only meant to be used by Radio Group.
    get privateInvalid() {
        return this.#privateInvalid;
    }
    // Private because it's only meant to be used by Radio Group.
    set privateInvalid(invalid) {
        this.#privateInvalid = invalid;
        this.ariaInvalid = invalid.toString();
    }
    /**
     * @default undefined
     */
    get label() {
        return this.#label;
    }
    set label(label) {
        this.#label = label;
        this.ariaLabel = label.toString();
    }
    // Private because it's only meant to be used by Radio Group.
    get privateRequired() {
        return this.#privateRequired;
    }
    // Private because it's only meant to be used by Radio Group.
    set privateRequired(required) {
        this.#privateRequired = required;
        this.ariaRequired = required.toString();
    }
    /**
     * @default undefined
     */
    get value() {
        return this.#value;
    }
    set value(value) {
        const old = this.#value;
        this.#value = value;
        // `this.value` can be set programmatically. Radio Group needs to know when
        // that happens so it can update its own `this.value`.
        this.dispatchEvent(new CustomEvent('private-value-change', {
            bubbles: true,
            detail: {
                // Without knowing what the old value was, Radio Group would be unable to
                // update `this.value`.
                old,
                new: value,
            },
        }));
    }
    firstUpdated() {
        this.ariaChecked = this.checked.toString();
        this.ariaDisabled = this.disabled.toString();
        this.ariaInvalid = this.privateInvalid.toString();
        this.ariaRequired = this.privateRequired.toString();
        this.role = 'radio';
        if (this.label) {
            this.ariaLabel = this.label;
        }
    }
    render() {
        return html `
      <div class="component" data-test="component">
        <div
          class=${classMap({
            circle: true,
            checked: this.checked,
            disabled: this.disabled,
            animate: this.hasUpdated,
        })}
          data-test="radio"
        ></div>

        ${this.#label}
      </div>
    `;
    }
    #checked;
    #disabled;
    #label;
    #privateInvalid;
    #privateRequired;
    #value;
};
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreRadioGroupRadio.prototype, "checked", null);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreRadioGroupRadio.prototype, "disabled", null);
__decorate([
    property({ type: Boolean })
], GlideCoreRadioGroupRadio.prototype, "privateInvalid", null);
__decorate([
    property({ reflect: true }),
    required
], GlideCoreRadioGroupRadio.prototype, "label", null);
__decorate([
    property({ type: Boolean, reflect: true })
], GlideCoreRadioGroupRadio.prototype, "privateRequired", null);
__decorate([
    property()
], GlideCoreRadioGroupRadio.prototype, "value", null);
__decorate([
    property({ reflect: true })
], GlideCoreRadioGroupRadio.prototype, "version", void 0);
GlideCoreRadioGroupRadio = __decorate([
    customElement('glide-core-radio-group-radio'),
    final
], GlideCoreRadioGroupRadio);
export default GlideCoreRadioGroupRadio;
