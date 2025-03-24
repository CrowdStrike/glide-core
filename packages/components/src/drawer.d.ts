import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-drawer': GlideCoreDrawer;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [open=false]
 * @attr {boolean} [pinned=false]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the drawer
 *
 * @cssprop [--width=27.375rem] - The width the drawer
 *
 * @fires {Event} toggle
 */
export default class GlideCoreDrawer extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    pinned: boolean;
    /**
     * @default false
     */
    get open(): boolean;
    set open(isOpen: boolean);
    readonly version: string;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
