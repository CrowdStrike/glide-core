import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-menu-link': GlideCoreMenuLink;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {string} [url]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 */
export default class GlideCoreMenuLink extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    label?: string;
    url?: string;
    privateActive: boolean;
    readonly version: string;
    click(): void;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
