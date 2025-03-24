import { LitElement } from 'lit';
import './tooltip.container.js';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-tooltip': GlideCoreTooltip;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {number} [offset=4]
 * @attr {boolean} [open=false]
 * @attr {'bottom'|'left'|'right'|'top'} [placement] - The placement of the tooltip relative to its target. Automatic placement will take over if the tooltip is cut off by the viewport.
 * @attr {boolean} [screenreader-hidden=false]
 * @attr {string[]} [shortcut=[]]
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreTooltipContainer} [private]
 * @slot {Element} target - The element to which the tooltip will anchor. Can be any element with an implicit or explicit ARIA role.
 *
 * @fires {Event} toggle
 */
export default class GlideCoreTooltip extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default false
     */
    get disabled(): boolean;
    set disabled(isDisabled: boolean);
    /**
     * @default undefined
     */
    get label(): string | undefined;
    set label(label: string);
    /**
     * @default 4
     */
    get offset(): number;
    set offset(offset: number);
    /**
     * @default false
     */
    get open(): boolean;
    /**
     * @default false
     */
    set open(isOpen: boolean);
    /**
     * The placement of the tooltip relative to its target. Automatic placement will
     * take over if the tooltip is cut off by the viewport.
     */
    placement?: 'bottom' | 'left' | 'right' | 'top';
    /**
     * @default false
     */
    get screenreaderHidden(): boolean;
    set screenreaderHidden(isHidden: boolean);
    /**
     * @default []
     */
    get shortcut(): string[];
    set shortcut(shortcut: string[]);
    readonly version: string;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private effectivePlacement;
}
