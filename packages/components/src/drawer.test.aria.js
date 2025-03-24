import { expect, test } from '@playwright/test';
test('open', async ({ page }, test) => {
    await page.goto('?id=drawer--drawer');
    await page
        .locator('glide-core-drawer')
        .evaluate((element) => {
        element.open = true;
    });
    await expect(page.locator('glide-core-drawer')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
