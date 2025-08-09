import { type Locator, test } from '@playwright/test';

export default test.extend<{
  setProperty: (
    locator: Locator,
    name: string,
    value: unknown,
  ) => Promise<unknown>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async setProperty({}, use) {
    await use(async (locator: Locator, name: string, value: unknown) => {
      return test.step('setProperty()', () => {
        return locator.evaluate(
          (element, options) => {
            // @ts-expect-error Elements don't have an index signature. But we don't know in
            // advance what property will be set.
            return (element[options.name] = options.value);
          },
          { name, value },
        );
      });
    });
  },
});
