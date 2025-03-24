import { expect, test } from '@playwright/test';
test('disabled=${true}', async ({ page }, test) => {
    await page.goto('?id=tag--tag');
    await page
        .locator('glide-core-tag')
        .evaluate((element) => {
        element.disabled = true;
        element.removable = true;
    });
    await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('disabled=${false}', async ({ page }, test) => {
    await page.goto('?id=tag--tag');
    await page
        .locator('glide-core-tag')
        .evaluate((element) => {
        element.removable = true;
    });
    await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
