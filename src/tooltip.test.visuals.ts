import { expect, test } from '@playwright/test';
import type GlideCoreTooltip from './tooltip.js';

test.describe('tooltip--tooltip', () => {
  test.describe('globals=theme:light', () => {
    test('offset', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.offset = 50;
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="bottom"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="left"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'left';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="right"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'right';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="top"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'top';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('shortcut', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.shortcut = ['CMD', 'K'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('offset', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.offset = 50;
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="bottom"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="left"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'left';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="right"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'right';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="top"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.placement = 'top';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('shortcut', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tooltip')
        .evaluate<void, GlideCoreTooltip>((element) => {
          element.open = true;
          element.shortcut = ['CMD', 'K'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
