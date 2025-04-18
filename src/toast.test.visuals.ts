import { expect, test } from '@playwright/test';
import type GlideCoreButton from './button.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Toast) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-button').click();
          await page.getByTestId('dismiss-button').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('informational', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button')
            .evaluate<void, GlideCoreButton>((element) => {
              element.dataset.description = 'Description';
            });

          await page.locator('glide-core-button').click();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('success', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button')
            .evaluate<void, GlideCoreButton>((element) => {
              element.dataset.description = 'Description';
              element.dataset.variant = 'success';
            });

          await page.locator('glide-core-button').click();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('error', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button')
            .evaluate<void, GlideCoreButton>((element) => {
              element.dataset.description = 'Description';
              element.dataset.variant = 'error';
            });

          await page.locator('glide-core-button').click();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
