import { expect, test } from '@playwright/test';
import type GlideCoreModal from './modal.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Modal) {
  test.describe(story, () => {
    test('back-button', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.backButton = true;
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('severity="informational"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.severity = 'informational';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('severity="medium"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.severity = 'medium';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('severity="critical"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.severity = 'critical';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="small"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.size = 'small';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="medium"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.size = 'medium';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="large"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.size = 'large';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('size="xlarge"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-modal')
        .evaluate<void, GlideCoreModal>((element) => {
          element.size = 'xlarge';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
