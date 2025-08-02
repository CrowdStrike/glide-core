import { expect, test } from '@playwright/test';
import type Tag from './tag.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Tag) {
  for (const story of stories.Tag) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(
            'disabled=${true}',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tag')
                .evaluate<void, Tag>((element) => {
                  element.disabled = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'disabled=${false}',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-tag').waitFor();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tag')
              .evaluate<void, Tag>((element) => {
                element.removable = true;
              });

            await page.getByRole('button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tag')
              .evaluate<void, Tag>((element) => {
                element.removable = true;
              });

            await page.getByRole('button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('removable', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-tag')
              .evaluate<void, Tag>((element) => {
                element.removable = true;
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
