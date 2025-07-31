import { expect, test } from '@playwright/test';
import type Button from './button.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Button) {
  for (const story of stories.Button) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(
            'disabled',
            { tag: '@visuals' },
            async ({ browserName, page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate<void, Button>((element) => {
                  element.disabled = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.${browserName}.png`,
              );
            },
          );

          test.describe(':active', () => {
            test(
              'disabled',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.disabled = true;
                  });

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="primary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="secondary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.variant = 'secondary';
                  });

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="tertiary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.variant = 'tertiary';
                  });

                await page.locator('glide-core-button').hover();
                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );
          });

          test.describe(':focus', () => {
            test(
              'disabled=${true}',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.disabled = true;
                    element.tooltip = 'Tooltip';
                  });

                await page.locator('glide-core-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'disabled=${false}',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-button').focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );
          });

          test.describe(':hover', () => {
            test(
              'disabled',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.disabled = true;
                    element.tooltip = 'Tooltip';
                  });

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="primary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);
                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="secondary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.variant = 'secondary';
                  });

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );

            test(
              'variant="tertiary"',
              { tag: '@visuals' },
              async ({ browserName, page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-button')
                  .evaluate<void, Button>((element) => {
                    element.variant = 'tertiary';
                  });

                await page.locator('glide-core-button').hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.${browserName}.png`,
                );
              },
            );
          });

          test(
            'size="small"',
            { tag: '@visuals' },
            async ({ browserName, page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate<void, Button>((element) => {
                  element.size = 'small';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.${browserName}.png`,
              );
            },
          );

          test(
            'variant="primary"',
            { tag: '@visuals' },
            async ({ browserName, page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-button').waitFor();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.${browserName}.png`,
              );
            },
          );

          test(
            'variant="secondary"',
            { tag: '@visuals' },
            async ({ browserName, page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate<void, Button>((element) => {
                  element.variant = 'secondary';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.${browserName}.png`,
              );
            },
          );

          test(
            'variant="tertiary"',
            { tag: '@visuals' },
            async ({ browserName, page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button')
                .evaluate<void, Button>((element) => {
                  element.variant = 'tertiary';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.${browserName}.png`,
              );
            },
          );
        });
      }
    });
  }
}
