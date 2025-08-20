import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  async toBeStable(locator: Locator) {
    const isStable = await new Promise<boolean>((resolve) => {
      setTimeout(() => resolve(false), this.timeout);

      let previousScreenshot = Buffer.from(new ArrayBuffer(0));

      (async () => {
        while (true) {
          const currentScreenshot = await locator.screenshot({
            animations: 'disabled',
          });

          if (previousScreenshot?.equals(currentScreenshot)) {
            resolve(true);
            break;
          }

          previousScreenshot = currentScreenshot;
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
      })();
    });

    const message = isStable
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeStable', false, true) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isStable,
      name: 'toBeStable',
      actual: isStable,
      expected: true as const,
    };
  },
});
