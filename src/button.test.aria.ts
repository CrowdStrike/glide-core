import { expect, test } from '@playwright/test';
import type GlideCoreButton from './button.js';

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=button--button');

  await page
    .locator('glide-core-button')
    .evaluate<void, GlideCoreButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=button--button');

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label"
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=button--button');

  await page
    .locator('glide-core-button')
    .evaluate<void, GlideCoreButton>((element) => {
      element.disabled = true;
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
    - tooltip "Tooltip"
  `);
});
