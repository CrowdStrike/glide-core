import { type Locator, test } from '@playwright/test';

/**
 * Cancels an event or stops its propagation.
 */
export default test.extend<{
  addEventListener: (
    locator: Locator,
    event: string,
    options: {
      preventDefault?: true;
      stopPropagation?: true;
      stopImmediatePropagation?: true;
    },
  ) => Promise<void>;
}>({
  // Playwright throws if the first argument isn't a destructured object.
  //
  // eslint-disable-next-line no-empty-pattern
  async addEventListener({}, use) {
    await use((locator: Locator, event, options) => {
      return test.step('addEventListener()', () => {
        return locator.evaluate(
          (node, { event, options }) => {
            node.addEventListener(event, (event: Event) => {
              if (options?.preventDefault) {
                event.preventDefault();
              }

              if (options?.stopPropagation) {
                event.stopPropagation();
              }

              if (options?.stopImmediatePropagation) {
                event.stopImmediatePropagation();
              }
            });
          },
          {
            event,
            options,
          },
        );
      });
    });
  },
});
