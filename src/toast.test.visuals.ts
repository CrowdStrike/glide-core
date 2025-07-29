import { expect, test } from '@playwright/test';
import type Button from './button.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Toast) {
  for (const story of stories.Toast) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-button').click();
            await page.getByTestId('dismiss-button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('informational', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-button')
              .evaluate<void, Button>((element) => {
                element.dataset.description = 'Description';
              });

            // Multiple Toasts so we screenshot the space between them.
            await page.locator('glide-core-button').click();
            await page.locator('glide-core-button').click();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('success', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-button')
              .evaluate<void, Button>((element) => {
                element.dataset.description = 'Description';
                element.dataset.variant = 'success';
              });

            // Multiple Toasts so we screenshot the space between them.
            await page.locator('glide-core-button').click();
            await page.locator('glide-core-button').click();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('error', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-button')
              .evaluate<void, Button>((element) => {
                element.dataset.description = 'Description';
                element.dataset.variant = 'error';
              });

            // Multiple Toasts so we screenshot the space between them.
            await page.locator('glide-core-button').click();
            await page.locator('glide-core-button').click();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });
      }
    });
  }
}
