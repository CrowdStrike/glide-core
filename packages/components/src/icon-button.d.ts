import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-icon-button': GlideCoreIconButton;
    }
}
/**
 * @attr {string} label
 * @attr {string|null} [aria-controls=null]
 * @attr {'true'|'false'|null} [aria-expanded=null]
 * @attr {'true'|'false'|'menu'|'listbox'|'tree'|'grid'|'dialog'|null} [aria-haspopup=null]
 * @attr {boolean} [disabled=false]
 * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} - An icon
 */
export default class GlideCoreIconButton extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    ariaControls: string | null;
    ariaExpanded: 'true' | 'false' | null;
    ariaHasPopup: 'true' | 'false' | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog' | null;
    disabled: boolean;
    label?: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    readonly version: string;
    click(): void;
    render(): import("lit").TemplateResult<1>;
}
