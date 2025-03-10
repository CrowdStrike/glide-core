import { expect, test } from '@playwright/test';
import type GlideCoreToasts from './toasts.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Toasts) {
  test.describe(story, () => {
    test('informational', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-toasts')
        .evaluate<void, GlideCoreToasts>((element) => {
          element.add({
            label: 'Label',
            description: 'Description',
            variant: 'informational',
          });
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('success', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-toasts')
        .evaluate<void, GlideCoreToasts>((element) => {
          element.add({
            label: 'Label',
            description: 'Description',
            variant: 'success',
          });
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('error', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-toasts')
        .evaluate<void, GlideCoreToasts>((element) => {
          element.add({
            label: 'Label',
            description: 'Description',
            variant: 'error',
          });
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
