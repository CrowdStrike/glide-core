import { type ElementPart } from 'lit';
import { Directive } from 'lit/directive.js';
declare class OnResize extends Directive {
    #private;
    render(callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => unknown, options?: ResizeObserverOptions): symbol;
    update(part: ElementPart, [callback, options]: [
        (entries: ResizeObserverEntry[], observer: ResizeObserver) => unknown,
        ResizeObserverOptions
    ]): symbol;
}
declare const _default: (callback: (entries: ResizeObserverEntry[], observer: ResizeObserver) => unknown, options?: ResizeObserverOptions | undefined) => import("lit/directive.js").DirectiveResult<typeof OnResize>;
export default _default;
