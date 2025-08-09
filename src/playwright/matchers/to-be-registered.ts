import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  async toBeRegistered(locator: Locator, name: string) {
    const isRegistered = await locator.evaluate((node, name) => {
      return window.customElements.get(name) === node.constructor;
    }, name);

    const message = isRegistered
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeRegistered', isRegistered, true) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isRegistered,
      name: 'toBeRegistered',
      actual: isRegistered,
      expected: true as const,
    };
  },
});
