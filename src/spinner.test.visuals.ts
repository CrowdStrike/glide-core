import { expect, test } from '@playwright/test';
import type GlideCoreSpinner from './spinner.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Spinner) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('size="large"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-spinner')
            .evaluate<void, GlideCoreSpinner>((element) => {
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
            .evaluate<void, GlideCoreSpinner>((element) => {
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
