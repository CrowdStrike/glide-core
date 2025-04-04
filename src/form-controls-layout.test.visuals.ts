import { expect, test } from '@playwright/test';
import type GlideCoreFormControlsLayout from './form-controls-layout.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Form Controls Layout']) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('split="left"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, GlideCoreFormControlsLayout>((element) => {
              element.split = 'left';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="middle"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, GlideCoreFormControlsLayout>((element) => {
              element.split = 'middle';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="right"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-form-controls-layout')
            .evaluate<void, GlideCoreFormControlsLayout>((element) => {
              element.split = 'right';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
