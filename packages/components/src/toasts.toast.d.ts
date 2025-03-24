import './icon-button.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-toast': GlideCoreToast;
    }
}
/**
 * @attr {string} [description]
 * @attr {number} [duration=5000]
 * @attr {string} [label]
 * @attr {'error'|'informational'|'success'} [variant]
 *
 * @fires {Event} close
 *
 * @method close
 * @method open
 */
export default class GlideCoreToast extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    description?: string;
    duration?: number | undefined;
    variant?: 'error' | 'informational' | 'success';
    close(): void;
    firstUpdated(): void;
    open(): void;
    render(): import("lit").TemplateResult<1>;
}
