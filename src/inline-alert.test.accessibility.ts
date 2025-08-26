import { expect, test } from './playwright/test.js';

// Not sure what to name this test. It's not really testing
// `variant="informational"`. It's testing the component in its default
// state because there aren't specific attributes that need to be tested.
test('variant="informational"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=inline-alert--inline-alert');

  await expect(page.locator('glide-core-inline-alert')).toMatchAriaSnapshot(`
    - alert "informational": Content
  `);
});
