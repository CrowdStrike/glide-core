import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-menu': GlideCoreMenu;
    }
}
/**
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'|'bottom-start'|'bottom-end'|'left-start'|'left-end'|'right-start'|'right-end'|'top-start'|'top-end'} [placement='bottom-start']
 * @attr {'large'|'small'} [size='large']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreMenuOptions}
 * @slot {Element} [target] - The element to which the popover will anchor. Can be any focusable element.
 *
 * @fires {Event} toggle
 */
export default class GlideCoreMenu extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
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
    placement: 'bottom' | 'left' | 'right' | 'top' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'top-start' | 'top-end';
    /**
     * @default 'large'
     */
    get size(): 'large' | 'small';
    set size(size: 'large' | 'small');
    readonly version: string;
    connectedCallback(): void;
    createRenderRoot(): ShadowRoot;
    disconnectedCallback(): void;
    firstUpdated(): void;
    private get isTargetDisabled();
    render(): import("lit").TemplateResult<1>;
}
