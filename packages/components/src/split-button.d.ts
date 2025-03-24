import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-split-button': GlideCoreSplitButton;
    }
}
/**
 * @attr {'large'|'small'} [size='large']
 * @attr {'primary'|'secondary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreSplitButtonPrimaryButton | GlideCoreSplitButtonPrimaryLink}
 * @slot {GlideCoreSplitButtonSecondaryButton} [secondary-button]
 */
export default class GlideCoreSplitButton extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default 'large'
     */
    get size(): 'large' | 'small';
    set size(size: 'large' | 'small');
    /**
     * @default 'primary'
     */
    get variant(): 'primary' | 'secondary';
    set variant(variant: 'primary' | 'secondary');
    readonly version: string;
    private get secondaryButtonElement();
    private get primaryButtonElement();
    render(): import("lit").TemplateResult<1>;
}
