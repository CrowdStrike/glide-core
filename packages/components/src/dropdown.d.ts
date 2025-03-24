import './checkbox.js';
import './icon-button.js';
import './label.js';
import './tooltip.js';
import { LitElement } from 'lit';
import GlideCoreDropdownOption from './dropdown.option.js';
import type FormControl from './library/form-control.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-dropdown': GlideCoreDropdown;
    }
}
/**
 * @attr {string} label
 * @attr {string} [add-button-label]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [filterable=false]
 * @attr {boolean} [hide-label=false]
 * @attr {boolean} [multiple=false]
 * @attr {string} [name='']
 * @attr {boolean} [open=false]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {string} [placeholder]
 * @attr {boolean} [readonly=false]
 * @attr {boolean} [required=false]
 * @attr {boolean} [select-all=false]
 * @attr {'large'|'small'} [size='large']
 * @attr {string} [tooltip]
 * @attr {string[]} [value=[]]
 * @attr {'quiet'} [variant]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreDropdownOption}
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element} [icon:value] - Icons for the selected option or options. Slot one icon per option. `<value>` should be equal to the `value` of each option.
 *
 * @fires {Event} add
 * @fires {Event} change
 * @fires {Event} input
 * @fires {Event} invalid
 * @fires {Event} toggle
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
 * @method filter
 * @param {string} query
 * @returns Promise<GlideCoreDropdownOption[]>
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
export default class GlideCoreDropdown extends LitElement implements FormControl {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    addButtonLabel?: string;
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    /**
     * @default false
     */
    get filterable(): boolean;
    set filterable(isFilterable: boolean);
    hideLabel: boolean;
    label?: string;
    name: string;
    /**
     * @default false
     */
    get open(): boolean;
    set open(isOpen: boolean);
    orientation: 'horizontal' | 'vertical';
    placeholder?: string;
    privateSplit?: 'left' | 'middle';
    readonly: boolean;
    selectAll: boolean;
    required: boolean;
    /**
     * @default false
     */
    get multiple(): boolean;
    set multiple(isMultiple: boolean);
    /**
     * @default 'large'
     */
    get size(): 'large' | 'small';
    set size(size: 'large' | 'small');
    tooltip?: string;
    /**
     * @default []
     */
    get value(): string[];
    set value(value: string[]);
    variant?: 'quiet';
    readonly version: string;
    private get activeOption();
    checkValidity(): boolean;
    click(): void;
    private get selectedOptions();
    private get lastSelectedOption();
    private get isAllSelected();
    private get isSomeSelected();
    private get internalLabel();
    connectedCallback(): void;
    createRenderRoot(): ShadowRoot;
    disconnectedCallback(): void;
    filter(query: string): Promise<GlideCoreDropdownOption[]>;
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
    private ariaActivedescendant;
    private inputValue;
    private isBlurring;
    private isCheckingValidity;
    private isCommunicateItemCountToScreenreaders;
    private isFilterable;
    private isFiltering;
    private isInputOverflow;
    private isInputTooltipOpen;
    private isInternalLabelOverflow;
    private isInternalLabelTooltipOpen;
    private isNoResults;
    private isReportValidityOrSubmit;
    private isShowSingleSelectIcon;
    private itemCount;
    private tagOverflowLimit;
    private validityMessage?;
}
