import { expect, test } from '@playwright/test';
import type Toggle from './toggle.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Toggle) {
  for (const story of stories.Toggle) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test('checked', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-toggle')
              .evaluate<void, Toggle>((element) => {
                element.checked = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-toggle')
              .evaluate<void, Toggle>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.getByRole('switch').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('hide-label', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-toggle')
              .evaluate<void, Toggle>((element) => {
                element.hideLabel = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe(':hover', () => {
            test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-toggle')
                .evaluate<void, Toggle>((element) => {
                  element.disabled = true;
                });

              // We hover the input field instead of the host because the host is made
              // to fill the width of the viewport by Label. So most of the host's width
              // is empty space that's unresponsive to hover.
              await page.getByRole('switch').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(
              'checked=${true}',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-toggle')
                  .evaluate<void, Toggle>((element) => {
                    element.checked = true;
                  });

                // We hover the input field instead of the host because the host is made
                // to fill the width of the viewport by Label. So most of the host's width
                // is empty space that's unresponsive to hover.
                await page.getByRole('switch').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'checked=${false}',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                // We hover the input field instead of the host because the host is made
                // to fill the width of the viewport by Label. So most of the host's width
                // is empty space that's unresponsive to hover.
                await page.getByRole('switch').hover();

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
                  .locator('glide-core-toggle')
                  .evaluate<void, Toggle>((element) => {
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
                .locator('glide-core-toggle')
                .evaluate<void, Toggle>((element) => {
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
                  .locator('glide-core-toggle')
                  .evaluate<void, Toggle>((element) => {
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
                .locator('glide-core-toggle')
                .evaluate<void, Toggle>((element) => {
                  element.orientation = 'vertical';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test(
            'slot="description"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-toggle')
                .evaluate<void, Toggle>((element) => {
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

          test('summary', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-toggle')
              .evaluate<void, Toggle>((element) => {
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
}
