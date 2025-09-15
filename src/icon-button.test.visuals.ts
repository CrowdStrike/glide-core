import { expect, test } from './playwright/test.js';
import type IconButton from './icon-button.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Icon Button');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      for (const variant of ['primary', 'secondary', 'tertiary'] as const) {
        test.describe(theme, () => {
          test.describe(variant, () => {
            test('disabled=${true}', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate((element: IconButton, variant) => {
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
                .locator('glide-core-icon-button')
                .evaluate((element: IconButton, variant) => {
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
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.disabled = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').hover();
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
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.disabled = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });
            });

            test.describe(':hover', () => {
              test('disabled=${true}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.disabled = true;
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });

              test('disabled=${false}', async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate((element: IconButton, variant) => {
                    element.variant = variant;
                  }, variant);

                await page.locator('glide-core-icon-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              });
            });

            test('size="large"', async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate((element: IconButton, variant) => {
                  element.size = 'large';
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
