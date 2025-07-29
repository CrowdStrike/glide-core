import { expect, test } from '@playwright/test';
import type Spinner from './spinner.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Spinner');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('size="large"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-spinner')
            .evaluate<void, Spinner>((element) => {
              element.size = 'large';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('size="medium"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-spinner').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('size="small"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-spinner')
            .evaluate<void, Spinner>((element) => {
              element.size = 'small';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
