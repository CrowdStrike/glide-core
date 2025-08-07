import { expect, test } from './playwright/test.js';
import type ButtonGroup from './button-group.js';
import type ButtonGroupButton from './button-group.button.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Button Group');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':focus:nth-of-type(1)', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.getByRole('radio').nth(0).focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':focus:nth-of-type(2)', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-button-group-button')
            .nth(1)
            .evaluate<void, ButtonGroupButton>((element) => {
              element.selected = true;
            });

          await page.getByRole('radio').nth(1).focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

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
            .evaluate<void, ButtonGroup>((element) => {
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
            .evaluate<void, ButtonGroupButton>((element) => {
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
