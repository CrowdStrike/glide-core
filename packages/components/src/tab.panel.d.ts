import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-tab-panel': GlideCoreTabPanel;
    }
}
/**
 * @attr {string} name - The corresponding GlideCoreTab should have a `panel` attribute with this name
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the panel
 *
 * @cssprop [--padding-inline-end=0rem]
 * @cssprop [--padding-inline-start=0rem]
 */
export default class GlideCoreTabPanel extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * The corresponding GlideCoreTab should have a `panel` attribute with this name
     */
    name?: string;
    get privateIsSelected(): boolean;
    set privateIsSelected(isSelected: boolean);
    readonly version: string;
    protected firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
