import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-private-tooltip-container': GlideCoreTooltipContainer;
    }
}
/**
 * @attr {boolean} [disabled=false]
 * @attr {string} [label]
 * @attr {'bottom'|'left'|'right'|'top'} [placement]
 * @attr {boolean} [screenreader-hidden=false]
 * @attr {string[]} [shortcut=[]]
 */
export default class GlideCoreTooltipContainer extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    label?: string;
    placement?: 'bottom' | 'left' | 'right' | 'top';
    screenreaderHidden: boolean;
    shortcut: string[];
    connectedCallback(): void;
    render(): import("lit").TemplateResult<1>;
}
