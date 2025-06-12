import { expect, test } from '@playwright/test';
import type Select from './select.js';

test.describe('disabled', async () => {
  test('open=${true}', async ({ page }) => {
    await page.goto('?id=select--select');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.disabled = true;
        element.open = true;
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - text: Toggle
      - combobox "Toggle"
    `);
  });

  test('open=${false}', async ({ page }) => {
    await page.goto('?id=select--select');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.disabled = true;
        element.open = false;
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - text: Toggle
      - combobox "Toggle"
    `);
  });
});
