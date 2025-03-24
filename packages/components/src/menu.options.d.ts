import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-menu-options': GlideCoreMenuOptions;
    }
}
/**
 * @attr {string} [aria-activedescendant='']
 * @attr {string} [aria-labelledby='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuButton | GlideCoreMenuLink}
 */
export default class GlideCoreMenuOptions extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    ariaActivedescendant: string;
    ariaLabelledby: string;
    privateSize: 'large' | 'small';
    readonly version: string;
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
