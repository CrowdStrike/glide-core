import { expect, test } from '@playwright/test';
test('<glide-core-tab>.disabled', async ({ page }, test) => {
    await page.goto('?id=tab-group--tabs');
    await page
        .locator('glide-core-tab')
        .first()
        .evaluate((element) => {
        element.disabled = true;
    });
    await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('<glide-core-tab>.selected', async ({ page }, test) => {
    await page.goto('?id=tab-group--tabs');
    await page.locator('glide-core-tab-group').waitFor();
    await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
