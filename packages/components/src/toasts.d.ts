import { LitElement } from 'lit';
import GlideCoreToast from './toasts.toast.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-toasts': GlideCoreToasts;
    }
}
/**
 * @readonly
 * @attr {string} [version]
 *
 * @method add
 * @param {{
 *     label: string;
 *     description: string;
 *     variant: 'error' | 'informational' | 'success';
 *     duration?: number; // Defaults to 5000. Set to `Infinity` to make the toast persist until dismissed.
 *   }} toast
 * @returns GlideCoreToast
 */
export default class GlideCoreToasts extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    readonly version: string;
    add(toast: {
        label: string;
        description: string;
        variant: 'error' | 'informational' | 'success';
        duration?: number;
    }): GlideCoreToast;
    render(): import("lit").TemplateResult<1>;
}
