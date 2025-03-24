import './icon-button.js';
import './label.js';
import { LitElement } from 'lit';
import type FormControl from './library/form-control.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-input': GlideCoreInput;
    }
}
/**
 * @attr {string} label
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
 * @attr {'date'|'email'|'number'|'password'|'search'|'tel'|'text'|'time'|'url'} [type='text']
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
export default class GlideCoreInput extends LitElement implements FormControl {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    type: 'date' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    name: string;
    value: string;
    label?: string;
    hideLabel: boolean;
    orientation: 'horizontal' | 'vertical';
    pattern: string | undefined;
    placeholder?: string;
    clearable: boolean;
    spellcheck: boolean;
    autocapitalize: 'on' | 'off' | 'none' | 'sentences' | 'words' | 'characters';
    autocomplete: 'on' | 'off';
    /** For 'password' type, whether to show a button to toggle the password's visibility */
    passwordToggle: boolean;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    privateSplit?: 'left' | 'middle';
    maxlength?: number;
    readonly version: string;
    tooltip?: string;
    get form(): HTMLFormElement | null;
    get validity(): ValidityState;
    checkValidity(): boolean;
    disconnectedCallback(): void;
    formAssociatedCallback(): void;
    formResetCallback(): void;
    render(): import("lit").TemplateResult<1>;
    reportValidity(): boolean;
    resetValidityFeedback(): void;
    setCustomValidity(message: string): void;
    setValidity(flags?: ValidityStateFlags, message?: string): void;
    constructor();
    private hasFocus;
    private isBlurring;
    private isCheckingValidity;
    private isReportValidityOrSubmit;
    private passwordVisible;
    private validityMessage?;
}
