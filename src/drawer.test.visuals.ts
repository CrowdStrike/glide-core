import { expect, test } from '@playwright/test';
import type GlideCoreDrawer from './drawer.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Drawer) {
  test.describe(story, () => {
    test('open=${true}', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${false}', async ({ page }, test) => {
      await page.goto(story);

      await page.locator('glide-core-drawer').waitFor({
        state: 'attached',
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('pinned', () => {
      test('open=${true}', async ({ page }, test) => {
        await page.goto(story);

        await page
          .locator('glide-core-drawer')
          .evaluate<void, GlideCoreDrawer>((element) => {
            element.open = true;
            element.pinned = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('open=${false}', async ({ page }, test) => {
        await page.goto(story);

        await page.locator('glide-core-drawer').waitFor({
          state: 'attached',
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('--width', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-drawer')
        .evaluate<void, GlideCoreDrawer>(async (element) => {
          element.open = true;
          element.style.setProperty('--width', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
