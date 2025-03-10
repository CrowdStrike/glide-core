import { expect, test } from '@playwright/test';
import type GlideCoreTag from './tag.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Tag) {
  test.describe(story, () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tag')
        .evaluate<void, GlideCoreTag>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('removable', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tag')
        .evaluate<void, GlideCoreTag>((element) => {
          element.removable = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tag')
        .evaluate<void, GlideCoreTag>((element) => {
          element.size = 'small';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="medium"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tag')
        .evaluate<void, GlideCoreTag>((element) => {
          element.size = 'medium';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="large"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-tag')
        .evaluate<void, GlideCoreTag>((element) => {
          element.size = 'large';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
