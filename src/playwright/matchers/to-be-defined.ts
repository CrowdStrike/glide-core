import { type Locator, expect } from '@playwright/test';

/**
 * Asserts that an element is in the custom element registry.
 */
export default expect.extend({
  async toBeDefined(locator: Locator, name: string) {
    const isDefined = await locator.evaluate((node, name) => {
      return window.customElements.get(name) === node.constructor;
    }, name);

    const message = isDefined
      ? () => ''
      : () =>
          this.utils.matcherHint('toBeDefined', isDefined, true) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isDefined,
      name: 'toBeDefined',
      actual: isDefined,
      expected: true as const,
    };
  },
});
