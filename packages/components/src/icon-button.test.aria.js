import { expect, test } from '@playwright/test';
test('disabled=${true}', async ({ page }, test) => {
    await page.goto('?id=icon-button--icon-button');
    await page
        .locator('glide-core-icon-button')
        .evaluate((element) => {
        element.disabled = true;
    });
    await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('disabled=${false}', async ({ page }, test) => {
    await page.goto('?id=icon-button--icon-button');
    await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
