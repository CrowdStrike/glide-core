import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-modal': GlideCoreModal;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [back-button=false]
 * @attr {boolean} [open=false]
 * @attr {'critical'|'informational'|'medium'} [severity]
 * @attr {'small'|'medium'|'large'|'xlarge'} [size='medium']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element | string}
 * @slot {GlideCoreModalIconButton} [header-actions]
 * @slot {GlideCoreButton} [primary]
 * @slot {GlideCoreButton} [secondary]
 * @slot {GlideCoreButton | GlideCoreTooltip} [tertiary]
 *
 * @fires {Event} toggle
 */
export default class GlideCoreModal extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    backButton: boolean;
    label?: string;
    /**
     * @default false
     */
    get open(): boolean;
    set open(isOpen: boolean);
    severity?: 'critical' | 'informational' | 'medium';
    size?: 'small' | 'medium' | 'large' | 'xlarge';
    readonly version: string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
    private hasPrimarySlotContent;
    private hasSecondarySlotContent;
    private hasTertiarySlotContent;
}
