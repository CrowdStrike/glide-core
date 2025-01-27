import { LitElement, noChange, type ElementPart } from 'lit';
import { Directive, directive } from 'lit/directive.js';

class OnResize extends Directive {
  render(
    // This method is required, both by `Directive` and so the directive's
    // options are typed at `onResize()` callsite.
    //
    /* eslint-disable @typescript-eslint/no-unused-vars */
    callback: (
      entries: ResizeObserverEntry[],
      observer: ResizeObserver,
    ) => unknown,
    options?: ResizeObserverOptions,
  ) {
    return noChange;
  }

  override update(
    part: ElementPart,
    [callback, options]: [
      (entries: ResizeObserverEntry[], observer: ResizeObserver) => unknown,
      ResizeObserverOptions,
    ],
  ) {
    if (
      part.options?.host instanceof LitElement &&
      !part.options.host.hasUpdated
    ) {
      this.#observer = new ResizeObserver(callback);
      this.#observer.observe(part.element, options);
    }

    // Purely for test coverage purposes. If `update()` doesn't call `render()`,
    // nothing will because `update()` exists.
    return this.render(callback, options);
  }

  #observer?: ResizeObserver;
}

export default directive(OnResize);
