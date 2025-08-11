import { type Locator, test } from '@playwright/test';

export default test.extend<{
  callMethod: (
    locator: Locator,
    name: string,
    ...arguments_: unknown[]
  ) => Promise<unknown>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async callMethod({}, use) {
    await use((locator: Locator, name: string, ...arguments_: unknown[]) => {
      return test.step('callMethod()', () => {
        return locator.evaluate(
          (element, { name, arguments_ }) => {
            //

            // @ts-expect-error Elements don't have an index signature. But we don't know in
            // advance what method will be called.
            if (name in element && typeof element[name] === 'function') {
              // @ts-expect-error See above.
              //
              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
              return element[name].call(element, ...arguments_);
            } else {
              throw new Error(
                `${element.tagName} doesn't have a ${name} method.`,
              );
            }
          },
          { name, arguments_ },
        );
      });
    });
  },
});
