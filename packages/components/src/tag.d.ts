import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-tag': GlideCoreTag;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [removable=false]
 * @attr {'small'|'medium'|'large'} [size='medium']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} edit
 * @fires {Event} remove
 */
export default class GlideCoreTag extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    label?: string;
    privateEditable: boolean;
    removable: boolean;
    size: 'small' | 'medium' | 'large';
    readonly version: string;
    click(): void;
    firstUpdated(): void;
    focus(): void;
    render(): import("lit").TemplateResult<1>;
}
