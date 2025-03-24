import './label.js';
import { LitElement } from 'lit';
import type FormControl from './library/form-control.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-textarea': GlideCoreTextarea;
    }
}
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
export default class GlideCoreTextarea extends LitElement implements FormControl {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    value: string;
    label?: string;
    hideLabel: boolean;
    orientation: 'horizontal' | 'vertical';
    placeholder?: string;
    required: boolean;
    readonly: boolean;
    disabled: boolean;
    maxlength?: number;
    name: string;
    spellcheck: boolean;
    autocapitalize: 'on' | 'off' | 'none' | 'sentences' | 'words' | 'characters';
    autocomplete: 'on' | 'off';
    privateSplit?: 'left' | 'middle';
    tooltip?: string;
    readonly version: string;
    checkValidity(): boolean;
    disconnectedCallback(): void;
    get form(): HTMLFormElement | null;
    get validity(): ValidityState;
    formAssociatedCallback(): void;
    formResetCallback(): void;
    render(): import("lit").TemplateResult<1>;
    reportValidity(): boolean;
    resetValidityFeedback(): void;
    setCustomValidity(message: string): void;
    setValidity(flags?: ValidityStateFlags, message?: string): void;
    constructor();
    private isBlurring;
    private isCheckingValidity;
    private isReportValidityOrSubmit;
    private validityMessage?;
}
