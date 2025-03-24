import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-button': GlideCoreButton;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [name='']
 * @attr {'large'|'small'} [size='large']
 * @attr {'button'|'submit'|'reset'} [type='button']
 * @attr {string} [value='']
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icon] - An icon after the label
 *
 * @readonly
 * @prop {HTMLFormElement | null} form
 */
export default class GlideCoreButton extends LitElement {
    #private;
    static formAssociated: boolean;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    label?: string;
    name: string;
    size: 'large' | 'small';
    type: 'button' | 'submit' | 'reset';
    value: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    readonly version: string;
    get form(): HTMLFormElement | null;
    click(): void;
    render(): import("lit").TemplateResult<1>;
    constructor();
    private hasPrefixIcon;
    private hasSuffixIcon;
}
