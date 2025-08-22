import type Link from './link.js';
import { expect, test } from '@/src/playwright/test.js';

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=link--link');

  await page.locator('glide-core-link').evaluate<void, Link>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot(`
    - link "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=link--link');

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot(`
    - link "Label":
      - /url: /
  `);
});
