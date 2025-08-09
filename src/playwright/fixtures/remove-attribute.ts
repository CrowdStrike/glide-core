import { type Locator, test } from '@playwright/test';

export default test.extend<{
  removeAttribute: (locator: Locator, name: string) => Promise<void>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async removeAttribute({}, use) {
    await use((locator: Locator, name: string) => {
      return test.step('removeAttribute()', async () => {
        await locator.evaluate(
          (element, options) => {
            return element.removeAttribute(options.name);
          },
          { name },
        );
      });
    });
  },
});
