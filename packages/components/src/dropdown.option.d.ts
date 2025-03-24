import './checkbox.js';
import './tooltip.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-dropdown-option': GlideCoreDropdownOption;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [editable=false]
 * @attr {boolean} [selected=false]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 *
 * @fires {Event} edit
 */
export default class GlideCoreDropdownOption extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    /**
     * @default false
     */
    get editable(): boolean;
    set editable(isEditable: boolean);
    /**
     * @default undefined
     */
    get label(): string | undefined;
    set label(label: string | undefined);
    privateIndeterminate: boolean;
    privateIsEditActive: boolean;
    privateMultiple: boolean;
    /**
     * @default false
     */
    get selected(): boolean;
    set selected(isSelected: boolean);
    privateSize: 'large' | 'small';
    privateActive: boolean;
    privateIsTooltipOpen: boolean;
    readonly version: string;
    private get isMultiple();
    private get lastSelectedOption();
    click(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    /**
     * @default ''
     */
    get value(): string;
    set value(value: string);
    privateEdit(): void;
    privateUpdateCheckbox(): Promise<void>;
    render(): import("lit").TemplateResult<1>;
    private isLabelOverflow;
}
