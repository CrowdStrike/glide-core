import { expect, test } from '@playwright/test';
const stories = JSON.parse(process.env.STORIES ?? '');
for (const story of stories.Dropdown) {
    test.describe(story.id, () => {
        for (const theme of story.themes) {
            test.describe(theme, () => {
                test('add-button-label', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.addButtonLabel = 'Add';
                        element.open = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('disabled', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.disabled = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('filterable', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.filterable = true;
                    });
                    await page.getByRole('combobox').fill('Test');
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test.describe(':focus', () => {
                    test('filterable=${true}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page
                            .locator('glide-core-dropdown')
                            .evaluate((element) => {
                            element.filterable = true;
                        });
                        await page.getByRole('combobox').focus();
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                    test('filterable=${false}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page.getByRole('button').focus();
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                });
                test('hide-label', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.hideLabel = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test(':hover', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page.locator('glide-core-dropdown').hover();
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('open', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.open = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('orientation="vertical"', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.orientation = 'vertical';
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('placeholder', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.placeholder = 'Placeholder';
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('readonly', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.readonly = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('required', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.required = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('select-all', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.multiple = true;
                        element.open = true;
                        element.selectAll = true;
                        element.value = ['one'];
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('slot="description"', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        const div = document.createElement('div');
                        div.textContent = 'Description';
                        div.slot = 'description';
                        element.append(div);
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('tooltip', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.tooltip = 'Tooltip';
                    });
                    await page.locator('glide-core-tooltip').getByRole('button').focus();
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test(`value="['one']"`, async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.open = true;
                        element.value = ['one'];
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test(`value="['one', 'two']"`, async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.multiple = true;
                        element.value = ['one', 'two'];
                        element.open = true;
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test('variant="quiet"', async ({ page }, test) => {
                    await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                    await page
                        .locator('glide-core-dropdown')
                        .evaluate((element) => {
                        element.variant = 'quiet';
                    });
                    await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                });
                test.describe('<glide-core-dropdown-option>.disabled', () => {
                    test('multiple=${false}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page
                            .locator('glide-core-dropdown')
                            .evaluate((element) => {
                            element.open = true;
                        });
                        await page
                            .locator('glide-core-dropdown-option')
                            .first()
                            .evaluate((element) => {
                            element.disabled = true;
                        });
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                    test('multiple=${true}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page
                            .locator('glide-core-dropdown')
                            .evaluate((element) => {
                            element.multiple = true;
                            element.open = true;
                        });
                        await page
                            .locator('glide-core-dropdown-option')
                            .first()
                            .evaluate((element) => {
                            element.disabled = true;
                        });
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                });
                test.describe('<glide-core-dropdown-option>.editable', () => {
                    test('multiple=${false}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page
                            .locator('glide-core-dropdown')
                            .evaluate((element) => {
                            element.open = true;
                        });
                        await page
                            .locator('glide-core-dropdown-option')
                            .first()
                            .evaluate((element) => {
                            element.editable = true;
                        });
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                    test('multiple=${true}', async ({ page }, test) => {
                        await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                        await page
                            .locator('glide-core-dropdown')
                            .evaluate((element) => {
                            element.multiple = true;
                            element.open = true;
                        });
                        await page
                            .locator('glide-core-dropdown-option')
                            .first()
                            .evaluate((element) => {
                            element.editable = true;
                        });
                        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
                    });
                });
            });
        }
    });
}
