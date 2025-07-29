import { expect, test } from '@playwright/test';
import type Tag from './tag.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Tag');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('disabled=${true}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tag')
            .evaluate<void, Tag>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('disabled=${false}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-tag').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tag')
            .evaluate<void, Tag>((element) => {
              element.removable = true;
            });

          await page.getByRole('button').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tag')
            .evaluate<void, Tag>((element) => {
              element.removable = true;
            });

          await page.getByRole('button').hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('removable', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tag')
            .evaluate<void, Tag>((element) => {
              element.removable = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
