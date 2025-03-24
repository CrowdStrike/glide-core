import { expect, test } from '@playwright/test';
test('informational', async ({ page }, test) => {
    await page.goto('?id=toasts--toasts');
    await page
        .locator('glide-core-toasts')
        .evaluate((element) => {
        element.add({
            label: 'Label',
            description: 'Description',
            variant: 'informational',
        });
    });
    await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('success', async ({ page }, test) => {
    await page.goto('?id=toasts--toasts');
    await page
        .locator('glide-core-toasts')
        .evaluate((element) => {
        element.add({
            label: 'Label',
            description: 'Description',
            variant: 'success',
        });
    });
    await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('error', async ({ page }, test) => {
    await page.goto('?id=toasts--toasts');
    await page
        .locator('glide-core-toasts')
        .evaluate((element) => {
        element.add({
            label: 'Label',
            description: 'Description',
            variant: 'error',
        });
    });
    await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
