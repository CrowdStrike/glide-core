import { expect, test } from '@playwright/test';

test('size="medium"', async ({ page }, test) => {
  await page.goto('?id=spinner--spinner');
  await page.locator('glide-core-spinner').waitFor();

  await expect(page.locator('glide-core-spinner')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
