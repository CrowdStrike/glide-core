import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-button-group-button': GlideCoreButtonGroupButton;
    }
}
/**
 * @attr {string} label
 * @attr {boolean} [disabled=false]
 * @attr {boolean} [selected=false]
 * @attr {string} [value='']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {Element} [icon]
 *
 * @fires {Event} selected
 */
export default class GlideCoreButtonGroupButton extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    label?: string;
    /**
     * @default false
     */
    get selected(): boolean;
    set selected(isSelected: boolean);
    disabled: boolean;
    value: string;
    privateOrientation: 'horizontal' | 'vertical';
    privateVariant?: 'icon-only';
    readonly version: string;
    click(): void;
    focus(options?: FocusOptions): void;
    privateSelect(): void;
    render(): import("lit").TemplateResult<1>;
    private hasIcon;
}
