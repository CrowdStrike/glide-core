import { expect, test } from '@playwright/test';
import type GlideCorePopover from './popover.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Popover) {
  test.describe(story, () => {
    test('offset', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-popover')
        .evaluate<void, GlideCorePopover>((element) => {
          element.offset = 50;
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="bottom"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-popover')
        .evaluate<void, GlideCorePopover>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="left"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-popover')
        .evaluate<void, GlideCorePopover>((element) => {
          element.placement = 'left';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="right"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-popover')
        .evaluate<void, GlideCorePopover>((element) => {
          element.placement = 'right';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placement="top"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-popover')
        .evaluate<void, GlideCorePopover>((element) => {
          element.placement = 'top';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
