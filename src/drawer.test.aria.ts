import { expect, test } from '@playwright/test';
import type Drawer from './drawer.js';

test('open', async ({ page }) => {
  await page.goto('?id=drawer--drawer');

  await page.locator('glide-core-drawer').evaluate<void, Drawer>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-drawer')).toMatchAriaSnapshot(`
    - complementary "Label"
  `);
});
