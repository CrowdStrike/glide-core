import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-menu-button': GlideCoreMenuButton;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
export default class GlideCoreMenuButton extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    label?: string;
    privateActive: boolean;
    readonly version: string;
    click(): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
