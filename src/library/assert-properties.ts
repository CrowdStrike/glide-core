// TODO: say why class decorator instead of property decorator
// TODO: also say this exists for a specific reason: because ts forces us to type required attributes as undefined
// TODO: should we test this and assertSlot or have tests everywhere in components? probably the former
// TODO: decorator must come after customElement decorator. how to detect?
export default function (...arguments_: string[]) {
  return function <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Type extends new (...arguments_: any[]) => object,
  >(constructor: Type) {
    return class extends constructor {
      update(...arguments__: unknown[]) {
        if ('update' in this.constructor.prototype) {
          // @ts-expect-error TODO
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          super.update(arguments__);
        }

        for (const property in this) {
          const isRequired = arguments_.includes(property);

          if (isRequired && !this[property]) {
            // TODO: add constructor name to messages?
            // TODO: maybe don't need to settimeout now with update()?
            // TODO: throw in timeout so compoent still renders? user might not check console if i do.
            setTimeout(() => {
              throw new TypeError(
                `Expected ${this.constructor.name} to have a "${property}" property.`,
              );
            });
          }
        }
      }
    };
  };
}
