import { expect, test } from '@playwright/test';

// Not sure what to name this test. It's not really testing `size="medium"`.
// It's testing the component in its default state because there aren't
// specific attributes that need to be tested.
test('size="medium"', async ({ page }, test) => {
  await page.goto('?id=spinner--spinner');
  await page.locator('glide-core-spinner').waitFor();

  await expect(page.locator('glide-core-spinner')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
