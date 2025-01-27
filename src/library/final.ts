// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function <Type extends new (...arguments_: any[]) => object>(
  constructor: Type,
) {
  return class Final extends constructor {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    constructor(...arguments_: any[]) {
      if (new.target !== Final) {
        throw new TypeError(`${constructor.name} does not allow extension.`);
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      super(...arguments_);
    }
  };
}
