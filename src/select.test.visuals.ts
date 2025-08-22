import { expect, test } from './playwright/test.js';
import type Select from './select.js';
import fetchStories from './playwright/fetch-stories.js';
import type Menu from './menu.js';
import type Option from './option.js';
import type OptionsGroup from './options.group.js';

const stories = await fetchStories('Select');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('loading', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
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
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
              element.offset = 50;
              element.open = true;
            });

          await page
            .locator('glide-core-option glide-core-menu')
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('open=${true}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option glide-core-menu')
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('open=${false}', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-select').waitFor();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placement="right-end"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
              element.placement = 'right-end';
              element.open = true;
            });

          await page
            .locator('glide-core-option glide-core-menu')
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-options-group>.hide-label', async ({
          page,
        }, test) => {
          test.skip(story.id !== 'select--with-groups');

          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Menu>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-options-group')
            .first()
            .evaluate<void, OptionsGroup>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>.description', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              element.description = 'Description';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-option>.disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
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

        test('<glide-core-option>.selected', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-select')
            .evaluate<void, Select>((element) => {
              element.open = true;
            });

          await page
            .locator('glide-core-option')
            .first()
            .evaluate<void, Option>((element) => {
              element.selected = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
