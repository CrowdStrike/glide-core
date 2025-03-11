import { expect, test } from '@playwright/test';
import type GlideCoreMenu from './menu.js';
import type GlideCoreMenuButton from './menu.button.js';
import type GlideCoreMenuLink from './menu.link.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Menu) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('offset', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
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
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('size="small"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
              element.size = 'small';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-menu-button>.disabled"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-menu-button')
            .first()
            .evaluate<void, GlideCoreMenuButton>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-menu-button>:hover"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
            });

          await page.locator('glide-core-menu-button').first().hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-menu-link>.disabled"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-menu-link')
            .first()
            .evaluate<void, GlideCoreMenuLink>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-menu-link>:hover"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-menu')
            .evaluate<void, GlideCoreMenu>((element) => {
              element.open = true;
            });

          await page.locator('glide-core-menu-link').first().hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
