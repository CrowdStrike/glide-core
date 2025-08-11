import { type Locator, test } from '@playwright/test';

export default test.extend<{
  setAttribute: (
    locator: Locator,
    name: string,
    value: string,
  ) => Promise<void>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async setAttribute({}, use) {
    await use((locator: Locator, name: string, value: string) => {
      return test.step('setAttribute()', () => {
        return locator.evaluate(
          (element, options) => {
            return element.setAttribute(options.name, options.value);
          },
          { name, value },
        );
      });
    });
  },
});
