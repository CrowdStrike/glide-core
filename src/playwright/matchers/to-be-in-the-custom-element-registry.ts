import { type Locator, expect } from '@playwright/test';

/**
 * Asserts that an element is in the custom element registry.
 */
export default expect.extend({
  async toBeInTheCustomElementRegistry(locator: Locator, name: string) {
    const isInTheRegistry = await locator.evaluate((node, name) => {
      return window.customElements.get(name) === node.constructor;
    }, name);

    const message = isInTheRegistry
      ? () => ''
      : () =>
          this.utils.matcherHint(
            'toBeInTheCustomElementRegistry',
            isInTheRegistry,
            true,
          ) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      message,
      pass: isInTheRegistry,
      name: 'toBeInTheCustomElementRegistry',
      actual: isInTheRegistry,
      expected: true as const,
    };
  },
});
