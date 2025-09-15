import { expect, test } from './playwright/test.js';
import type Button from './button.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Button');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      for (const variant of [
        'primary',
        'secondary',
        'tertiary',
        'link',
      ] as const) {
        test.describe(theme, () => {
          test.describe(variant, () => {
            test('disabled=${true}', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate((element: Button, variant) => {
                  element.disabled = true;
                  element.variant = variant;
                }, variant);

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test('disabled=${false}', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate((element: Button, variant) => {
                  element.variant = variant;
                }, variant);

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test('loading', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate((element: Button, variant) => {
                  element.loading = true;
                  element.variant = variant;
                }, variant);

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test.describe(':active', () => {
              test('disabled=${true}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.disabled = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('loading', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.loading = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });
            });

            test.describe(':focus', () => {
              test('disabled=${true}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.disabled = true;
                    element.tooltip = 'Tooltip';
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-button').focus();

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.variant = variant;
                  }, variant);

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('loading', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.loading = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });
            });

            test.describe(':hover', () => {
              test('disabled=${true}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.disabled = true;
                    element.tooltip = 'Tooltip';
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('loading', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate((element: Button, variant) => {
                    element.loading = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });
            });

            test('size="small"', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate((element: Button, variant) => {
                  element.size = 'small';
                  element.variant = variant;
                }, variant);

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });
        });
      }
    }
  });
}
