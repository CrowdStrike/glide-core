import { expect, test } from '@playwright/test';
import type GlideCoreToasts from './toasts.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Toasts) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-toasts')
            .evaluate<void, GlideCoreToasts>((element) => {
              element.add({
                label: 'Label',
                description: 'Description',
                variant: 'informational',
              });
            });

          await page.getByLabel('Close').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('informational', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-toasts')
            .evaluate<void, GlideCoreToasts>((element) => {
              element.add({
                label: 'Label',
                description: 'Description',
                variant: 'informational',
              });
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('success', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-toasts')
            .evaluate<void, GlideCoreToasts>((element) => {
              element.add({
                label: 'Label',
                description: 'Description',
                variant: 'success',
              });
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('error', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-toasts')
            .evaluate<void, GlideCoreToasts>((element) => {
              element.add({
                label: 'Label',
                description: 'Description',
                variant: 'error',
              });
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
