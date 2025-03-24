import { type ElementPart } from 'lit';
import { Directive, type PartInfo } from 'lit/directive.js';
declare class AssertSlot extends Directive {
    render(slotted?: (typeof Element | typeof Text)[] | null, isOptional?: boolean): symbol;
    update(part: ElementPart, [slotted, isOptional]: [
        (typeof Element | typeof Text)[] | undefined | null,
        boolean | undefined
    ]): symbol;
    constructor(partInfo: PartInfo);
}
declare const _default: (slotted?: ({
    new (): Element;
    prototype: Element;
} | {
    new (data?: string): Text;
    prototype: Text;
})[] | null | undefined, isOptional?: boolean | undefined) => import("lit/directive.js").DirectiveResult<typeof AssertSlot>;
export default _default;
