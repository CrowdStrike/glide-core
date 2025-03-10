import { expect, test } from '@playwright/test';
import type GlideCoreIconButton from './icon-button.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Icon Button']) {
  test.describe(story, () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-icon-button')
        .evaluate<void, GlideCoreIconButton>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-icon-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(story);
        await page.locator('glide-core-icon-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-icon-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-icon-button').hover();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('press', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.disabled = true;
          });

        await page.locator('glide-core-icon-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="primary"', async ({ page }, test) => {
        await page.goto(story);
        await page.locator('glide-core-icon-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="secondary"', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.variant = 'secondary';
          });

        await page.locator('glide-core-icon-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('variant="tertiary"', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-icon-button')
          .evaluate<void, GlideCoreIconButton>((element) => {
            element.variant = 'tertiary';
          });

        await page.locator('glide-core-icon-button').hover();
        await page.mouse.down();
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('variant="primary"', async ({ page }, test) => {
      await page.goto(story);
      await page.locator('glide-core-icon-button').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="secondary"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-icon-button')
        .evaluate<void, GlideCoreIconButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="tertiary"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-icon-button')
        .evaluate<void, GlideCoreIconButton>((element) => {
          element.variant = 'secondary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
