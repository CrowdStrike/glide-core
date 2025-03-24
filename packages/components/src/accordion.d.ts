import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-accordion': GlideCoreAccordion;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [open=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the accordion
 * @slot {Element} [prefix-icon] - An icon before the label
 * @slot {Element} [suffix-icons] - Icons after the label
 *
 * @fires {Event} toggle
 */
export default class GlideCoreAccordion extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    /**
     * @default false
     */
    get open(): boolean;
    set open(isOpen: boolean);
    readonly version: string;
    click(): void;
    render(): import("lit").TemplateResult<1>;
    private hasPrefixIcon;
    private hasSuffixIcons;
    private isClosing;
}
