import { expect, test } from './playwright/test.js';
import type Label from './label.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Label');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('slot="description"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('error', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
              element.error = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('orientation="horizontal"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page.locator('glide-core-label').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('orientation="vertical"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.orientation = 'vertical';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('slot="summary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Summary';
              div.slot = 'summary';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('required', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.required = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="left"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.split = 'left';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="middle"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.split = 'middle';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('split="right"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.split = 'right';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('tooltip', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-label')
            .evaluate<void, Label>((element) => {
              element.tooltip = 'Tooltip';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
