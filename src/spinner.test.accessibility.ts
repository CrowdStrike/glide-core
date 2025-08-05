import { expect, test } from './playwright/test.js';

// Not sure what to name this test. It's not really testing `size="medium"`.
// It's testing the component in its default state because there aren't
// specific attributes that need to be tested.
test('size="medium"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=spinner--spinner');
  await page.locator('glide-core-spinner').waitFor();

  await expect(page.locator('glide-core-spinner')).toMatchAriaSnapshot(`
    - progressbar "Label"
  `);
});
