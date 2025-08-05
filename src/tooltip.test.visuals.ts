import { expect, test } from './playwright/test.js';
import type Tooltip from './tooltip.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Tooltip');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('description', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.description = 'Description';
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('offset', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.offset = 50;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="bottom"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="left"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.open = true;
              element.placement = 'left';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="right"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.open = true;
              element.placement = 'right';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="top"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, Tooltip>((element) => {
              element.open = true;
              element.placement = 'top';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('shortcut', () => {
          test('description=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tooltip')
              .evaluate<void, Tooltip>((element) => {
                element.shortcut = ['CMD', 'K'];

                // `open` will synchronously trigger a "toggle" event. So `shortcut` needs
                // to be set first. Otherwise, the story (via its `play()` method) will set
                // `shortcut` back to its initial value: an empty array.
                element.open = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('description="Description"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tooltip')
              .evaluate<void, Tooltip>((element) => {
                element.description = 'Description';
                element.shortcut = ['CMD', 'K'];

                // `open` will synchronously trigger a "toggle" event. So `shortcut` needs
                // to be set first. Otherwise, the story (via its `play()` method) will set
                // `shortcut` back to its initial value: an empty array.
                element.open = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });
      });
    }
  });
}
