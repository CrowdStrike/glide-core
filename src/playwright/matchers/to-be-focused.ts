import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  async toBeFocused(locator: Locator) {
    const isFocused = await locator.evaluate((node) => {
      const rootNode = node.getRootNode();

      return rootNode instanceof ShadowRoot
        ? node === rootNode.host.shadowRoot?.activeElement
        : document.activeElement === node;
    });

    const message = isFocused
      ? () => ''
      : () =>
          this.utils.matcherHint('isFocused', false, true) +
          '\n\n' +
          // Locators have a `toString()` implementation that serializes nicely.
          //
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          `Locator: ${locator.toString()}\n` +
          `Expected: ${this.utils.printExpected(true)}\n` +
          `Received: ${this.utils.printReceived(false)}`;

    return {
      actual: isFocused,
      expected: true as const,
      message,
      name: 'isFocused',
      pass: isFocused,
    };
  },
});
