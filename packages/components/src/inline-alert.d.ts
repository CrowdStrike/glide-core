import './icon-button.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-inline-alert': GlideCoreInlineAlert;
    }
}
/**
 * @attr {boolean} [removable=false]
 * @attr {'informational'|'medium'|'high'|'critical'} [variant='informational']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the alert
 *
 * @fires {Event} remove
 */
export default class GlideCoreInlineAlert extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    variant: 'informational' | 'medium' | 'high' | 'critical';
    removable?: boolean | undefined;
    readonly version: string;
    firstUpdated(): void;
    focus(): void;
    render(): import("lit").TemplateResult<1>;
}
