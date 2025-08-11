import { type Locator, expect } from '@playwright/test';

export default expect.extend({
  async toHaveFormData(locator: Locator, name: string, value: unknown) {
    const result = await locator.evaluate((node, name) => {
      return node instanceof HTMLFormElement
        ? {
            tagName: node.tagName,
            value: new FormData(node).get(name),
          }
        : {
            tagName: node.tagName,
            value: null,
          };
    }, name);

    const message =
      result.tagName === 'FORM' && result.value === value
        ? () => ''
        : result.tagName === 'FORM'
          ? () =>
              // Locators have a `toString()` implementation that serializes nicely.
              //
              // eslint-disable-next-line @typescript-eslint/no-base-to-string
              `Locator: ${locator.toString()}\n` +
              `Expected: ${this.utils.printExpected(value)}\n` +
              `Received: ${this.utils.printReceived(result.value)}`
          : () =>
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
