import { expect, test } from './playwright/test.js';
import type Slider from './slider.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Slider');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test(':focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page.locator('glide-core-slider').getByRole('slider').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-slider')
            .evaluate<void, Slider>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page.locator('glide-core-slider').getByRole('slider').hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('multiple=${false}', () => {
          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('readonly', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.readonly = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(`value="['80']"`, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.value = [80];
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('multiple=${true}', () => {
          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.multiple = true;
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('readonly', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.multiple = true;
                element.readonly = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(`value="['10, 90']"`, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
                element.multiple = true;
                element.value = [10, 90];
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('orientation="horizontal"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
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
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
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
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
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
              .locator('glide-core-slider')
              .evaluate<void, Slider>((element) => {
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
            .locator('glide-core-slider')
            .evaluate<void, Slider>((element) => {
              element.required = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('slot="description"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-slider')
            .evaluate<void, Slider>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
