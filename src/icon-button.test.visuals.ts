import { expect, test } from '@playwright/test';
import type IconButton from './icon-button.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories['Icon Button']) {
  for (const story of stories['Icon Button']) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-icon-button')
              .evaluate<void, IconButton>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe(':active', () => {
            test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate<void, IconButton>((element) => {
                  element.disabled = true;
                });

              await page.locator('glide-core-icon-button').hover();
              await page.mouse.down();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(
              'variant="primary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-icon-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'variant="secondary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate<void, IconButton>((element) => {
                    element.variant = 'secondary';
                  });

                await page.locator('glide-core-icon-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'variant="tertiary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate<void, IconButton>((element) => {
                    element.variant = 'tertiary';
                  });

                await page.locator('glide-core-icon-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          });

          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-icon-button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe(':hover', () => {
            test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate<void, IconButton>((element) => {
                  element.disabled = true;
                });

              await page.locator('glide-core-icon-button').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(
              'variant="primary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-icon-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'variant="secondary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate<void, IconButton>((element) => {
                    element.variant = 'secondary';
                  });

                await page.locator('glide-core-icon-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              'variant="tertiary"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-icon-button')
                  .evaluate<void, IconButton>((element) => {
                    element.variant = 'tertiary';
                  });

                await page.locator('glide-core-icon-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          });

          test(
            'variant="primary"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-icon-button').waitFor();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'variant="secondary"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate<void, IconButton>((element) => {
                  element.variant = 'secondary';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'variant="tertiary"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-icon-button')
                .evaluate<void, IconButton>((element) => {
                  element.variant = 'tertiary';
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
