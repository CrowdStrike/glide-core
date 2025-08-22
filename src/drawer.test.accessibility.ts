import type Drawer from './drawer.js';
import { expect, test } from '@/src/playwright/test.js';

test('open', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=drawer--drawer');

  await page.locator('glide-core-drawer').evaluate<void, Drawer>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-drawer')).toMatchAriaSnapshot(`
    - complementary "Label"
  `);
});
