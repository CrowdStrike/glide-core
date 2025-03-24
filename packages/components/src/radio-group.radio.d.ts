import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-radio-group-radio': GlideCoreRadioGroupRadio;
    }
}
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
export default class GlideCoreRadioGroupRadio extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get checked(): boolean;
    set checked(isChecked: boolean);
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(disabled: boolean);
    get privateInvalid(): boolean;
    set privateInvalid(invalid: boolean);
    /**
     * @default undefined
     */
    get label(): string | undefined;
    set label(label: string);
    get privateRequired(): boolean;
    set privateRequired(required: boolean);
    /**
     * @default undefined
     */
    get value(): string;
    set value(value: string);
    readonly version: string;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
