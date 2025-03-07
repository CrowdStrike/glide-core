import { expect, test } from '@playwright/test';
import type GlideCoreDrawer from './drawer.js';

test.describe('drawer--drawer', () => {
  test.describe('globals=theme:light', () => {
    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page.locator('glide-core-drawer').waitFor({
        state: 'attached',
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('pinned', () => {
      test('open=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-drawer')
          .evaluate<void, GlideCoreDrawer>((element) => {
            element.open = true;
            element.pinned = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('open=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-drawer').waitFor({
          state: 'attached',
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('--width', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>(async (element) => {
          element.open = true;
          element.style.setProperty('--width', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page.locator('glide-core-drawer').waitFor({
        state: 'attached',
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('pinned', () => {
      test('open=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-drawer')
          .evaluate<void, GlideCoreDrawer>((element) => {
            element.open = true;
            element.pinned = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('open=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page.locator('glide-core-drawer').waitFor({
          state: 'attached',
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('--width', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>(async (element) => {
          element.open = true;
          element.style.setProperty('--width', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
