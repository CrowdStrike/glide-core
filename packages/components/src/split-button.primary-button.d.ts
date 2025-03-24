import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-split-button-primary-button': GlideCoreSplitButtonPrimaryButton;
    }
}
/**
 * @attr {string} label
 * @attr {string|null} [aria-controls=null]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null} [aria-haspopup=null]
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 */
export default class GlideCoreSplitButtonPrimaryButton extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    ariaControls: string | null;
    ariaExpanded: 'true' | 'false' | null;
    ariaHasPopup: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | null;
    disabled: boolean;
    label?: string;
    privateSize: 'large' | 'small';
    privateVariant: 'primary' | 'secondary';
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
}
