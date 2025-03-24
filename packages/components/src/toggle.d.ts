import './label.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-toggle': GlideCoreToggle;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [checked=false]
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [hide-label=false]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {string} [summary]
 * @attr {string} [tooltip]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} [description] - Additional information or context
 *
 * @fires {Event} change
 */
export default class GlideCoreToggle extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    checked: boolean;
    disabled: boolean;
    hideLabel: boolean;
    label?: string;
    orientation: 'horizontal' | 'vertical';
    privateSplit?: 'left' | 'middle';
    summary?: string;
    tooltip?: string;
    readonly version: string;
    click(): void;
    focus(options?: FocusOptions): void;
    render(): import("lit").TemplateResult<1>;
}
