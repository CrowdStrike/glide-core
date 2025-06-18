import { expect, test } from '@playwright/test';
import type Menu from './menu.js';
import type Option from './option.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Menu) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('loading', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.loading = true;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('offset', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.offset = 50;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('open', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>.disabled"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>:hover"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .first()
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page.locator('glide-core-option').first().hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
