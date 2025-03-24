import './label.js';
import './tooltip.js';
import { LitElement } from 'lit';
import type FormControl from './library/form-control.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-radio-group': GlideCoreRadioGroup;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {string} [name='']
 * @attr {'horizontal'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {string} [tooltip]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreRadio}
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
export default class GlideCoreRadioGroup extends LitElement implements FormControl {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    hideLabel: boolean;
    label?: string;
    name: string;
    orientation: "horizontal";
    privateSplit?: 'left' | 'middle';
    tooltip?: string;
    /**
     * @default false
     */
    get required(): boolean;
    set required(isRequired: boolean);
    /**
     * @default ''
     */
    get value(): string;
    set value(value: string);
    readonly version: string;
    checkValidity(): boolean;
    disconnectedCallback(): void;
    firstUpdated(): void;
    focus(options?: FocusOptions): void;
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
