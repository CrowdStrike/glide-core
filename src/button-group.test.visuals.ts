import { expect, test } from '@playwright/test';
import type ButtonGroup from './button-group.js';
import type ButtonGroupButton from './button-group.button.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories['Button Group']) {
  for (const story of stories['Button Group']) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(
            ':focus:nth-of-type(1)',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.getByRole('radio').nth(0).focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            ':focus:nth-of-type(2)',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button-group-button')
                .nth(1)
                .evaluate<void, ButtonGroupButton>((element) => {
                  element.selected = true;
                });

              await page.getByRole('radio').nth(1).focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-button-group-button').nth(1).hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(
            'orientation="horizontal"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-button-group').waitFor();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            'orientation="vertical"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button-group')
                .evaluate<void, ButtonGroup>((element) => {
                  element.orientation = 'vertical';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-button-group-button>.disabled',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-button-group-button')
                .nth(1)
                .evaluate<void, ButtonGroupButton>((element) => {
                  element.disabled = true;
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
