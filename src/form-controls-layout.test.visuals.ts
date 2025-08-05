import { expect, test } from './playwright/test.js';
import type FormControlsLayout from './form-controls-layout.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Form Controls Layout');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('split="left"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, FormControlsLayout>((element) => {
              element.split = 'left';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="middle"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, FormControlsLayout>((element) => {
              element.split = 'middle';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="right"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, FormControlsLayout>((element) => {
              element.split = 'right';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
