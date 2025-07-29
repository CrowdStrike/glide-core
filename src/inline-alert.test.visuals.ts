import { expect, test } from '@playwright/test';
import type InlineAlert from './inline-alert.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Inline Alert');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('variant="informational', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-inline-alert').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="medium', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-inline-alert')
            .evaluate<void, InlineAlert>((element) => {
              element.variant = 'medium';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="high', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-inline-alert')
            .evaluate<void, InlineAlert>((element) => {
              element.variant = 'high';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="critical', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-inline-alert')
            .evaluate<void, InlineAlert>((element) => {
              element.variant = 'critical';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
