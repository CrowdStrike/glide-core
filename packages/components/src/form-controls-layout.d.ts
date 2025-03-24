import { LitElement } from 'lit';
declare global {
    interface HTMLElementTagNameMap {
        'glide-core-form-controls-layout': GlideCoreFormControlsLayout;
    }
}
/**
 * @attr {'left'|'middle'} [split='left']
 *
 * @readonly
 * @attr {string} [version]
 *
 * @slot {GlideCoreCheckbox | GlideCoreCheckboxGroup | GlideCoreDropdown | GlideCoreRadioGroup | GlideCoreInput | GlideCoreTextArea}
 */
export default class GlideCoreFormControlsLayout extends LitElement {
    #private;
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    /**
     * @default 'left'
     */
    get split(): 'left' | 'middle';
    set split(split: 'left' | 'middle');
    readonly version: string;
    render(): import("lit").TemplateResult<1>;
}
