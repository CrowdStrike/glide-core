import { expect, test } from './playwright/test.js';
import type IconButton from './icon-button.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Icon Button');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-icon-button')
            .evaluate<void, IconButton>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':active', () => {
          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.disabled = true;
              });

            await page.locator('glide-core-icon-button').hover();
            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="primary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-icon-button').hover();
            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="secondary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.variant = 'secondary';
              });

            await page.locator('glide-core-icon-button').hover();
            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="tertiary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.variant = 'tertiary';
              });

            await page.locator('glide-core-icon-button').hover();
            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-icon-button').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':hover', () => {
          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.disabled = true;
              });

            await page.locator('glide-core-icon-button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="primary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-icon-button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="secondary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.variant = 'secondary';
              });

            await page.locator('glide-core-icon-button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('variant="tertiary"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.variant = 'tertiary';
              });

            await page.locator('glide-core-icon-button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('variant="primary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-icon-button').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="secondary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-icon-button')
            .evaluate<void, IconButton>((element) => {
              element.variant = 'secondary';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="tertiary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-icon-button')
            .evaluate<void, IconButton>((element) => {
              element.variant = 'tertiary';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
