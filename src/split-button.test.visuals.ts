import { expect, test } from '@playwright/test';
import type GlideCoreSplitButton from './split-button.js';
import type GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';
import type GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';
import type GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Split Button']) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('size="small"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button')
            .evaluate<void, GlideCoreSplitButton>((element) => {
              element.size = 'small';
            });

          await page
            .locator('glide-core-split-button-secondary-button')
            .evaluate<void, GlideCoreSplitButtonSecondaryButton>((element) => {
              element.menuOpen = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="primary"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-split-button')
            .evaluate<void, GlideCoreSplitButton>((element) => {
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
            .evaluate<void, GlideCoreSplitButton>((element) => {
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
              .evaluate<void, GlideCoreSplitButtonPrimaryLink>((element) => {
                element.disabled = true;
              });

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
              .evaluate<void, GlideCoreSplitButtonPrimaryButton>((element) => {
                element.disabled = true;
              });

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
            .evaluate<void, GlideCoreSplitButtonSecondaryButton>((element) => {
              element.disabled = true;
            });

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
            .evaluate<void, GlideCoreSplitButtonSecondaryButton>((element) => {
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
            .evaluate<void, GlideCoreSplitButton>((element) => {
              element.style.display = 'block';
              element.style.marginTop = '10rem';
            });

          await page
            .locator('glide-core-split-button-secondary-button')
            .evaluate<void, GlideCoreSplitButtonSecondaryButton>((element) => {
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
