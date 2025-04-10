import { expect, test } from '@playwright/test';
import type GlideCoreInlineAlert from './inline-alert.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Inline Alert']) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-inline-alert')
            .evaluate<void, GlideCoreInlineAlert>((element) => {
              element.removable = true;
            });

          await page.getByRole('button').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('removable', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-inline-alert')
            .evaluate<void, GlideCoreInlineAlert>((element) => {
              element.removable = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

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
            .evaluate<void, GlideCoreInlineAlert>((element) => {
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
            .evaluate<void, GlideCoreInlineAlert>((element) => {
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
            .evaluate<void, GlideCoreInlineAlert>((element) => {
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
