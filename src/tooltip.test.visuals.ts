import { expect, test } from '@playwright/test';
import type Tooltip from './tooltip.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Tooltip) {
  for (const story of stories.Tooltip) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test('description', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tooltip')
              .evaluate<void, Tooltip>((element) => {
                element.description = 'Description';
                element.open = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('offset', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tooltip')
              .evaluate<void, Tooltip>((element) => {
                element.offset = 50;
                element.open = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(
            'placement="bottom"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tooltip')
                .evaluate<void, Tooltip>((element) => {
                  element.open = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'placement="left"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tooltip')
                .evaluate<void, Tooltip>((element) => {
                  element.open = true;
                  element.placement = 'left';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'placement="right"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tooltip')
                .evaluate<void, Tooltip>((element) => {
                  element.open = true;
                  element.placement = 'right';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'placement="top"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tooltip')
                .evaluate<void, Tooltip>((element) => {
                  element.open = true;
                  element.placement = 'top';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test.describe('shortcut', () => {
            test(
              'description=""',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-tooltip')
                  .evaluate<void, Tooltip>((element) => {
                    element.shortcut = ['CMD', 'K'];

                    // `open` will synchronously trigger a "toggle" event. So `shortcut` needs
                    // to be set first. Otherwise, the story (via its `play()` method) will set
                    // `shortcut` back to its initial value: an empty array.
                    element.open = true;
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'description="Description"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-tooltip')
                  .evaluate<void, Tooltip>((element) => {
                    element.description = 'Description';
                    element.shortcut = ['CMD', 'K'];

                    // `open` will synchronously trigger a "toggle" event. So `shortcut` needs
                    // to be set first. Otherwise, the story (via its `play()` method) will set
                    // `shortcut` back to its initial value: an empty array.
                    element.open = true;
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          });
        });
      }
    });
  }
}
