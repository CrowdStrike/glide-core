import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-split-button-primary-link': GlideCoreSplitButtonPrimaryLink;
    }
}
/**
 * @attr {string} label
 * @attr {string} url
 * @attr {boolean} [disabled=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon] - An icon before the label
 */
export default class GlideCoreSplitButtonPrimaryLink extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    label?: string;
    url?: string;
    privateSize: 'large' | 'small';
    privateVariant: 'primary' | 'secondary';
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
}
