import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-button-group': GlideCoreButtonGroup;
    }
}
/**
 * @attr {string} label
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {'icon-only'} [variant]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreButtonGroupButton}
 */
export default class GlideCoreButtonGroup extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    /**
     * @default undefined
     */
    get variant(): 'icon-only' | undefined;
    set variant(variant: 'icon-only' | undefined);
    /**
     * @default 'horizontal'
     */
    get orientation(): 'horizontal' | 'vertical';
    set orientation(orientation: 'horizontal' | 'vertical');
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
}
