import { expect, test } from '@playwright/test';
import type GlideCoreFormControlsLayout from './form-controls-layout.js';

test.describe('form-controls-layout--form-controls-layout', () => {
  test.describe('globals=theme:light', () => {
    test('split="left"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'left';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('split="middle"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'middle';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('split="left"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'left';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('split="middle"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-form-controls-layout')
        .evaluate<void, GlideCoreFormControlsLayout>((element) => {
          element.split = 'middle';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
