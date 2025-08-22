import type Tooltip from './tooltip.js';
import { expect, test } from '@/src/playwright/test.js';

test('description', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.description = 'Description';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label Description"
  `);
});

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');
  await page.locator('glide-core-tooltip').waitFor();

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label"
  `);
});

test('shortcut', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, Tooltip>((element) => {
      element.shortcut = ['CMD', 'K'];
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Label CMD + K"
  `);
});
