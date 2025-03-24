/**
 * To be used in Storybook only
 */
import { LitElement } from 'lit';
export default class GlideCoreExampleIcon extends LitElement {
    static shadowRootOptions: ShadowRootInit;
    static styles: import("lit").CSSResult[];
    name: keyof typeof icons;
    icons: {
        edit: import("lit").TemplateResult<2>;
        move: import("lit").TemplateResult<2>;
        share: import("lit").TemplateResult<2>;
        settings: import("lit").TemplateResult<2>;
        info: import("lit").TemplateResult<2>;
        calendar: import("lit").TemplateResult<2>;
        'chevron-down': import("lit").TemplateResult<2>;
        checkmark: import("lit").TemplateResult<2>;
        clipboard: import("lit").TemplateResult<2>;
        'drag-dots': import("lit").TemplateResult<2>;
        'arrow-left': import("lit").TemplateResult<2>;
    };
    firstUpdated(): void;
    render(): import("lit").TemplateResult<1>;
}
declare const icons: {
    edit: import("lit").TemplateResult<2>;
    move: import("lit").TemplateResult<2>;
    share: import("lit").TemplateResult<2>;
    settings: import("lit").TemplateResult<2>;
    info: import("lit").TemplateResult<2>;
    calendar: import("lit").TemplateResult<2>;
    'chevron-down': import("lit").TemplateResult<2>;
    checkmark: import("lit").TemplateResult<2>;
    clipboard: import("lit").TemplateResult<2>;
    'drag-dots': import("lit").TemplateResult<2>;
    'arrow-left': import("lit").TemplateResult<2>;
};
export {};
