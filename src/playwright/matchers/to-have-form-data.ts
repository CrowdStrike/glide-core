import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  async toHaveFormData(locator: Locator, name: string, value: unknown) {
    const result = await locator.evaluate((node, name) => {
      const value =
        node instanceof HTMLFormElement ? new FormData(node).get(name) : null;

      return {
        tagName: node.tagName,
        value,
      };
    }, name);

    const message =
      result.tagName === 'FORM' && result.value === value
        ? () => ''
        : result.tagName === 'FORM'
          ? () =>
              this.utils.matcherHint('toHaveFormData', result.value, value) +
              '\n\n' +
              // Locators have a `toString()` implementation that serializes nicely.
              //
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              `Locator: ${locator.toString()}\n` +
              `Expected: ${this.utils.printExpected(value)}\n` +
              `Received: ${this.utils.printReceived(result.value)}`
          : () =>
              this.utils.matcherHint('toHaveFormData', result.value, value) +
              '\n\n' +
              // Locators have a `toString()` implementation that serializes nicely.
              //
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              `Locator: ${locator.toString()}\n` +
              `Expected: ${this.utils.printExpected('FORM')}\n` +
              `Received: ${this.utils.printReceived(result.tagName)}`;

    return {
      actual: result.tagName === 'FORM' ? result.value : result.tagName,
      expected: result.tagName === 'FORM' ? value : result.tagName,
      message,
      name: 'toHaveFormData',
      pass: result.tagName === 'FORM' && result.value === value,
    };
  },
});
