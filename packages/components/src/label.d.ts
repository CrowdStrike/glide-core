import './tooltip.js';
import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-private-label': GlideCoreLabel;
    }
}
/**
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [error=false]
 * @attr {boolean} [hide=false]
 * @attr {string} [label]
 * @attr {'horizontal'|'vertical'} [orientation='horizontal']
 * @attr {boolean} [required=false]
 * @attr {'left'|'middle'} [split]
 * @attr {string} [tooltip]
 *
 * @slot {HTMLLabelElement}
 * @slot {Element} [control] - The element with which the label is associated
 * @slot {Element | string} [description] - Additional information or context
 * @slot {Element | string} [summary] - Additional information or context
 */
export default class GlideCoreLabel extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    disabled: boolean;
    error: boolean;
    hide: boolean;
    orientation: 'horizontal' | 'vertical';
    required: boolean;
    split?: 'left' | 'middle';
    tooltip?: string;
    label?: string;
    render(): import("lit").TemplateResult<1>;
    private hasDescription;
    private hasSummarySlot;
    private isLabelTooltip;
}
