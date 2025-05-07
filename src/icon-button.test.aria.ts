import { expect, test } from '@playwright/test';
import type GlideCoreIconButton from './icon-button.js';

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=icon-button--icon-button');

  await page
    .locator('glide-core-icon-button')
    .evaluate<void, GlideCoreIconButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=icon-button--icon-button');

  await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot(`
    - button "Label"
  `);
});
