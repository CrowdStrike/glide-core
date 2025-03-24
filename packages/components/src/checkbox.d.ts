import './label.js';
import './tooltip.js';
import { LitElement } from 'lit';
import type FormControl from './library/form-control.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-checkbox': GlideCoreCheckbox;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {boolean} [indeterminate=false]
 * @attr {string} [name='']
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 * @attr {string} [value]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element} [private-icon]
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
export default class GlideCoreCheckbox extends LitElement implements FormControl {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    checked: boolean;
    privateInternallyInert: boolean;
    disabled: boolean;
    hideLabel: boolean;
    indeterminate: boolean;
    /**
     * @default undefined
     */
    get label(): string | undefined;
    set label(label: string | undefined);
    orientation: 'horizontal' | 'vertical';
    name: string;
    privateLabelTooltipOffset: number;
    privateShowLabelTooltip: boolean;
    privateDisableLabelTooltip: boolean;
    privateSize: 'large' | 'small';
    privateSplit?: 'left' | 'middle';
    privateVariant?: 'minimal';
    required: boolean;
    summary?: string;
    tooltip?: string;
    /**
     * @default undefined
     */
    get value(): string;
    set value(value: string);
    privateIsReportValidityOrSubmit: boolean;
    readonly version: string;
    get form(): HTMLFormElement | null;
    checkValidity(): boolean;
    click(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    get validity(): ValidityState;
    focus(options?: FocusOptions): void;
    formAssociatedCallback(): void;
    formResetCallback(): void;
    render(): import("lit").TemplateResult<1>;
    reportValidity(): boolean;
    resetValidityFeedback(): void;
    setCustomValidity(message: string): void;
    setValidity(flags?: ValidityStateFlags, message?: string): void;
    updated(): void;
    constructor();
    private isBlurring;
    private isCheckingValidity;
    private isLabelOverflow;
    private validityMessage?;
}
