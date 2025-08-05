import { expect, test } from './playwright/test.js';
import type SplitButton from './split-button.js';
import type SplitButtonPrimaryButton from './split-button.primary-button.js';
import type SplitButtonPrimaryLink from './split-button.primary-link.js';
import type SplitButtonSecondaryButton from './split-button.secondary-button.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Split Button');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('variant="primary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button')
            .evaluate<void, SplitButton>((element) => {
              element.variant = 'primary';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="secondary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button')
            .evaluate<void, SplitButton>((element) => {
              element.variant = 'secondary';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        if (story.id.includes('primary-link')) {
          test('<glide-core-split-button-primary-link>.disabled', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-split-button-primary-link')
              .evaluate<void, SplitButtonPrimaryLink>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-link>:active', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-split-button-primary-link').hover();

            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-link>:focus', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-split-button-primary-link').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-link>:hover', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page.locator('glide-core-split-button-primary-link').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        } else {
          test('<glide-core-split-button-primary-button>.disabled', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-split-button-primary-button')
              .evaluate<void, SplitButtonPrimaryButton>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-button>:active', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-split-button-primary-button')
              .hover();

            await page.mouse.down();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-button>:focus', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-split-button-primary-button')
              .focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('<glide-core-split-button-primary-button>:hover', async ({
            page,
          }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-split-button-primary-button')
              .hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        }

        test('<glide-core-split-button-secondary-button>.disabled', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button-secondary-button')
            .evaluate<void, SplitButtonSecondaryButton>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-split-button-secondary-button>:active', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button-secondary-button')
            .hover();

          await page.mouse.down();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-split-button-secondary-button>:focus', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button-secondary-button')
            .focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-split-button-secondary-button>:hover', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button-secondary-button')
            .hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-split-button-secondary-button>[menu-placement="bottom-end"]', async ({
          page,
        }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button-secondary-button')
            .evaluate<void, SplitButtonSecondaryButton>((element) => {
              element.menuOpen = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-split-button-secondary-button>[menu-placement="top-end"]', async ({
          page,
        }, test) => {
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
        });
      });
    }
  });
}
