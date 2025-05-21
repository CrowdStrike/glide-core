import { expect, test } from '@playwright/test';
import type Link from './link.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Link) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('disabled=${true}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-link')
            .evaluate<void, Link>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('disabled=${false}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-link').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':active', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-link').hover();
          await page.mouse.down();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-link').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':hover', () => {
          test('href=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-link')
              .evaluate<void, Link>((element) => {
                element.href = '';
              });

            await page.locator('glide-core-link').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('href="https://example.com"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-link')
              .evaluate<void, Link>((element) => {
                element.href = 'https://example.com';
              });

            await page.locator('glide-core-link').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });
      });
    }
  });
}
