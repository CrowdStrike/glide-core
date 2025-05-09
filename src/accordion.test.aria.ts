import { expect, test } from '@playwright/test';
import type Accordion from './accordion.js';

test('open=${true}', async ({ page }) => {
  await page.goto('?id=accordion--accordion');

  await page
    .locator('glide-core-accordion')
    .evaluate<void, Accordion>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot(`
    - group: Label Content
  `);
});

test('open=${false}', async ({ page }) => {
  await page.goto('?id=accordion--accordion');

  await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot(`
    - group: Label Content
  `);
});
