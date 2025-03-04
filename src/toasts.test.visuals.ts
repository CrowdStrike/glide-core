import { expect, test } from '@playwright/test';
import type GlideCoreToasts from './toasts.js';

test.describe('toasts--toasts', () => {
  test.describe('globals=theme:light', () => {
    test('informational', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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

  test.describe('globals=theme:dark', () => {
    test('informational', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

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
});
