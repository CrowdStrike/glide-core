import { expect, test } from '@playwright/test';
const stories = JSON.parse(process.env.STORIES ?? '');
for (const story of stories.Toggle) {
    test.describe(story.id, () => {
        for (const theme of story.themes) {
            test.describe(theme, () => {
                test('checked', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.checked = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('disabled', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.disabled = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test(':focus', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page.getByRole('switch').focus();
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('hide-label', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.hideLabel = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('orientation="vertical"', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.orientation = 'vertical';
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('slot="description"', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        const div = document.createElement('div');
                        div.textContent = 'Description';
                        div.slot = 'description';
                        element.append(div);
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('summary', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.summary = 'Summary';
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('tooltip', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-toggle')
                        .evaluate((element) => {
                        element.tooltip = 'Tooltip';
                    });
                    await page.locator('glide-core-tooltip').getByRole('button').focus();
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
            });
        }
    });
}
