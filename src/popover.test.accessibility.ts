import { expect, test } from '@playwright/test';
import type Popover from './popover.js';

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button [expanded]
    - text: Content
  `);
});
