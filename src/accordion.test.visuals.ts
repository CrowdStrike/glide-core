import { expect, test } from '@playwright/test';
import type Accordion from './accordion.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Accordion) {
  for (const story of stories.Accordion) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-accordion').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('open=${false}', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-accordion').waitFor();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('open=${true}', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-accordion')
              .evaluate<void, Accordion>((element) => {
                element.open = true;
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
