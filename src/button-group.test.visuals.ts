import { expect, test } from '@playwright/test';
import type GlideCoreButtonGroup from './button-group.js';
import type GlideCoreButtonGroupButton from './button-group.button.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Button Group']) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-button-group-button').nth(1).hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('orientation="horizontal"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-button-group').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('orientation="vertical"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button-group')
            .evaluate<void, GlideCoreButtonGroup>((element) => {
              element.orientation = 'vertical';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-button-group-button>.disabled', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button-group-button')
            .nth(1)
            .evaluate<void, GlideCoreButtonGroupButton>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
