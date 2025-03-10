import { expect, test } from '@playwright/test';
import type GlideCoreFormControlsLayout from './form-controls-layout.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Form Controls Layout']) {
  test.describe(story, () => {
    test('split="left"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'left';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('split="middle"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'middle';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
