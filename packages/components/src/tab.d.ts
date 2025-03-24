import { LitElement, type PropertyValues } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-tab': GlideCoreTab;
    }
}
/**
 * @attr {string} panel
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [selected=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - A label
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
export default class GlideCoreTab extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    panel?: string;
    disabled: boolean;
    /**
     * @default false
     */
    get selected(): boolean;
    set selected(isSelected: boolean);
    readonly version: string;
    protected firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    protected updated(changes: PropertyValues): void;
}
