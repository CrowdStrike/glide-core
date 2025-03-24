import './menu.options.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-split-button-secondary-button': GlideCoreSplitButtonSecondaryButton;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [menu-open=false]
 * @attr {'bottom-end'|'top-end'} [menu-placement='bottom-end']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuButton | GlideCoreMenuLink}
 */
export default class GlideCoreSplitButtonSecondaryButton extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    label?: string;
    menuOpen: boolean;
    menuPlacement: 'bottom-end' | 'top-end';
    privateActive: boolean;
    privateSize: 'large' | 'small';
    privateVariant: 'primary' | 'secondary';
    readonly version: string;
    click(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
