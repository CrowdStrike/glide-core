import { expect, test } from '@playwright/test';
test('open=${true}', async ({ page }, test) => {
    await page.goto('?id=accordion--accordion');
    await page
        .locator('glide-core-accordion')
        .evaluate((element) => {
        element.open = true;
    });
    await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('open=${false}', async ({ page }, test) => {
    await page.goto('?id=accordion--accordion');
    await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
