import './icon-button.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-tab-group': GlideCoreTabGroup;
    }
}
/**
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreTabPanel}
 * @slot {GlideCoreTab} [nav]
 *
 * @cssprop [--tabs-padding-block-end=0rem]
 * @cssprop [--tabs-padding-block-start=0rem]
 * @cssprop [--tabs-padding-inline-end=0rem]
 * @cssprop [--tabs-padding-inline-start=0rem]
 */
export default class GlideCoreTabGroup extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
    private get selectedTab();
    private set selectedTab(value);
    updated(): void;
    private isDisableOverflowEndButton;
    private isDisableOverflowStartButton;
    private isShowOverflowButtons;
}
