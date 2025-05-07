import { expect, test } from '@playwright/test';
import type GlideCoreTag from './tag.js';

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page
    .locator('glide-core-tag')
    .evaluate<void, GlideCoreTag>((element) => {
      element.disabled = true;
      element.removable = true;
    });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label" [disabled]'
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page
    .locator('glide-core-tag')
    .evaluate<void, GlideCoreTag>((element) => {
      element.removable = true;
    });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label"'
  `);
});
