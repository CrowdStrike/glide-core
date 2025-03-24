import { expect, test } from '@playwright/test';
test('disabled=${true}', async ({ page }, test) => {
    await page.goto('?id=button--button');
    await page
        .locator('glide-core-button')
        .evaluate((element) => {
        element.disabled = true;
    });
    await expect(page.locator('glide-core-button')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('disabled=${false}', async ({ page }, test) => {
    await page.goto('?id=button--button');
    await expect(page.locator('glide-core-button')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
