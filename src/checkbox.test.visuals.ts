import type Checkbox from './checkbox.js';
import { expect, test } from '@/src/playwright/test.js';
import fetchStories from '@/src/playwright/fetch-stories.js';

const stories = await fetchStories('Checkbox');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('checked', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.checked = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.getByRole('checkbox').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':hover', () => {
          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.disabled = true;
              });

            // We hover the input field instead of the host because the host is made
            // to fill the width of the viewport by Label. So most of the host's width
            // is empty space that's unresponsive to hover.
            await page.getByRole('checkbox').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('checked=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.checked = true;
              });

            // We hover the input field instead of the host because the host is made
            // to fill the width of the viewport by Label. So most of the host's width
            // is empty space that's unresponsive to hover.
            await page.getByRole('checkbox').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('checked=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            // We hover the input field instead of the host because the host is made
            // to fill the width of the viewport by Label. So most of the host's width
            // is empty space that's unresponsive to hover.
            await page.getByRole('checkbox').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('indeterminate', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.indeterminate = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('orientation="horizontal"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.orientation = 'horizontal';
                element.tooltip = 'Tooltip';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('tooltip=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.orientation = 'horizontal';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('orientation="vertical"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.orientation = 'vertical';
                element.tooltip = 'Tooltip';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('tooltip=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox')
              .evaluate<void, Checkbox>((element) => {
                element.orientation = 'vertical';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('required', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.required = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('slot="description"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('summary', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-checkbox')
            .evaluate<void, Checkbox>((element) => {
              element.summary = 'Summary';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
