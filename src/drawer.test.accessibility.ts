import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Drawer from './drawer.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
  );

  await expect(page).toBeAccessible('glide-core-drawer');
});

test('open', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=drawer--drawer');

  await page.locator('glide-core-drawer').evaluate<void, Drawer>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-drawer')).toMatchAriaSnapshot(`
    - complementary "Label"
  `);
});
