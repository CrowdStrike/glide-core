import { expect, test } from '@playwright/test';
test('checked=${true}', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.checked = true;
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('checked=${false}', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('disabled=${true}', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.disabled = true;
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('disabled=${false}', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('hide-label', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.hideLabel = true;
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('indeterminate', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.indeterminate = true;
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('slot="description"', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        const div = document.createElement('div');
        div.textContent = 'Description';
        div.slot = 'description';
        element.append(div);
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('summary', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.summary = 'Summary';
    });
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
test('tooltip', async ({ page }, test) => {
    await page.goto('?id=checkbox--checkbox');
    await page
        .locator('glide-core-checkbox')
        .evaluate((element) => {
        element.tooltip = 'Tooltip';
    });
    await page.locator('glide-core-tooltip').getByRole('button').focus();
    await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot({
        name: `${test.titlePath.join('.')}.yml`,
    });
});
