import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('can be cleared', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-input
        label="Label"
        value="testing"
        clearable
      ></glide-core-input>`,
  );

  const host = page.locator('glide-core-input');
  const clearButton = host.locator('[data-test="clear-button"]');

  await expect(host).toDispatchEvents(
    () => clearButton.click(),
    [
      {
        bubbles: true,
        composed: true,
        type: 'input',
      },
    ],
  );

  await expect(host).toHaveJSProperty('value', '');
});

test('reveals its value', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-input
        label="Label"
        type="password"
        password-toggle
      ></glide-core-input>`,
  );

  const host = page.locator('glide-core-input');
  const input = host.locator('input');
  const passwordToggle = host.locator('[data-test="password-toggle"]');

  await expect(input).toHaveAttribute('type', 'password');

  await passwordToggle.click();

  await expect(input).toHaveAttribute('type', 'text');
});
