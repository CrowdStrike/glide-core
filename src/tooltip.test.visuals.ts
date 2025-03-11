import { expect, test } from '@playwright/test';
import type GlideCoreTooltip from './tooltip.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Tooltip) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('offset', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.offset = 50;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="bottom"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="left"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.open = true;
              element.placement = 'left';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="right"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.open = true;
              element.placement = 'right';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="top"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.open = true;
              element.placement = 'top';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('shortcut', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tooltip')
            .evaluate<void, GlideCoreTooltip>((element) => {
              element.open = true;
              element.shortcut = ['CMD', 'K'];
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
