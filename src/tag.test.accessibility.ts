import type Tag from './tag.js';
import { expect, test } from '@/src/playwright/test.js';

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page.locator('glide-core-tag').evaluate<void, Tag>((element) => {
    element.disabled = true;
    element.removable = true;
  });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label" [disabled]'
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page.locator('glide-core-tag').evaluate<void, Tag>((element) => {
    element.removable = true;
  });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label"'
  `);
});
