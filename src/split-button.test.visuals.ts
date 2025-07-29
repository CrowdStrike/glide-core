import { expect, test } from '@playwright/test';
import type SplitButton from './split-button.js';
import type SplitButtonPrimaryButton from './split-button.primary-button.js';
import type SplitButtonPrimaryLink from './split-button.primary-link.js';
import type SplitButtonSecondaryButton from './split-button.secondary-button.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories['Split Button']) {
  for (const story of stories['Split Button']) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(
            'variant="primary"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button')
                .evaluate<void, SplitButton>((element) => {
                  element.variant = 'primary';
                });

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
                .locator('glide-core-split-button')
                .evaluate<void, SplitButton>((element) => {
                  element.variant = 'secondary';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          if (story.id.includes('primary-link')) {
            test(
              '<glide-core-split-button-primary-link>.disabled',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-link')
                  .evaluate<void, SplitButtonPrimaryLink>((element) => {
                    element.disabled = true;
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-link>:active',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-link')
                  .hover();

                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-link>:focus',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-link')
                  .focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-link>:hover',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-link')
                  .hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          } else {
            test(
              '<glide-core-split-button-primary-button>.disabled',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-button')
                  .evaluate<void, SplitButtonPrimaryButton>((element) => {
                    element.disabled = true;
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-button>:active',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-button')
                  .hover();

                await page.mouse.down();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-button>:focus',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-button')
                  .focus();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test(
              '<glide-core-split-button-primary-button>:hover',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-split-button-primary-button')
                  .hover();

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );
          }

          test(
            '<glide-core-split-button-secondary-button>.disabled',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button-secondary-button')
                .evaluate<void, SplitButtonSecondaryButton>((element) => {
                  element.disabled = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-split-button-secondary-button>:active',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button-secondary-button')
                .hover();

              await page.mouse.down();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-split-button-secondary-button>:focus',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button-secondary-button')
                .focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-split-button-secondary-button>:hover',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button-secondary-button')
                .hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-split-button-secondary-button>[menu-placement="bottom-end"]',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button-secondary-button')
                .evaluate<void, SplitButtonSecondaryButton>((element) => {
                  element.menuOpen = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-split-button-secondary-button>[menu-placement="top-end"]',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-split-button')
                .evaluate<void, SplitButton>((element) => {
                  element.style.display = 'block';
                  element.style.marginTop = '10rem';
                });

              await page
                .locator('glide-core-split-button-secondary-button')
                .evaluate<void, SplitButtonSecondaryButton>((element) => {
                  element.menuOpen = true;
                  element.menuPlacement = 'top-end';
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
