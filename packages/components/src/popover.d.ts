import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-popover': GlideCorePopover;
    }
}
/**
 * @attr {boolean} [disabled=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'} [placement]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string} - The content of the popover
 * @slot {Element} [target] - The element to which the popover will anchor. Can be any focusable element.
 *
 * @fires {Event} toggle
 */
export default class GlideCorePopover extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    /**
     * @default 4
     */
    get offset(): number;
    set offset(offset: number);
    /**
     * @default false
     */
    get open(): boolean;
    set open(isOpen: boolean);
    placement?: 'bottom' | 'left' | 'right' | 'top';
    readonly version: string;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private effectivePlacement;
}
