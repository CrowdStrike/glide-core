import { expect, test } from '@playwright/test';
import type Slider from './slider.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Slider) {
  for (const story of stories.Slider) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-slider').getByRole('slider').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('hide-label', { tag: '@visuals' }, async ({ page }, test) => {
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

          test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-slider').getByRole('slider').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe('multiple=${false}', () => {
            test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
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

            test('readonly', { tag: '@visuals' }, async ({ page }, test) => {
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

            test(
              `value="['80']"`,
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-slider')
                  .evaluate<void, Slider>((element) => {
                    element.value = [80];
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          });

          test.describe('multiple=${true}', () => {
            test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
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

            test('readonly', { tag: '@visuals' }, async ({ page }, test) => {
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

            test(
              `value="['10, 90']"`,
              { tag: '@visuals' },
              async ({ page }, test) => {
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
              },
            );
          });

          test.describe('orientation="horizontal"', () => {
            test(
              'tooltip="Tooltip"',
              { tag: '@visuals' },
              async ({ page }, test) => {
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
              },
            );

            test('tooltip=""', { tag: '@visuals' }, async ({ page }, test) => {
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
            test(
              'tooltip="Tooltip"',
              { tag: '@visuals' },
              async ({ page }, test) => {
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
              },
            );

            test('tooltip=""', { tag: '@visuals' }, async ({ page }, test) => {
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

          test('required', { tag: '@visuals' }, async ({ page }, test) => {
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

          test(
            'slot="description"',
            { tag: '@visuals' },
            async ({ page }, test) => {
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
            },
          );
        });
      }
    });
  }
}
