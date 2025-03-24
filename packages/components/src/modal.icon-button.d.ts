import './icon-button.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-modal-icon-button': GlideCoreModalIconButton;
    }
}
/**
 * @attr {string} label
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} - An icon
 */
export default class GlideCoreModalIconButton extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
}
