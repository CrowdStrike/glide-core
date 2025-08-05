import { expect, test } from '@playwright/test';
import type Drawer from './drawer.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Drawer');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('open=${true}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-drawer')
            .evaluate<void, Drawer>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('open=${false}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page.locator('glide-core-drawer').waitFor({
            state: 'attached',
          });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('pinned', () => {
          test('open=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-drawer')
              .evaluate<void, Drawer>((element) => {
                element.open = true;
                element.pinned = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('open=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-drawer').waitFor({
              state: 'attached',
            });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('--width', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-drawer')
            .evaluate<void, Drawer>(async (element) => {
              element.open = true;
              element.style.setProperty('--width', '5rem');
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
