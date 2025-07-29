import { expect, test } from '@playwright/test';
import type TabGroup from './tab.group.js';
import type Tab from './tab.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories['Tab Group']) {
  for (const story of stories['Tab Group']) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test(
            'custom properties',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tab-group')
                .evaluate<void, TabGroup>((element) => {
                  element.style.setProperty('--tabs-padding-block-end', '5rem');

                  element.style.setProperty(
                    '--tabs-padding-block-start',
                    '5rem',
                  );

                  element.style.setProperty(
                    '--tabs-padding-inline-end',
                    '5rem',
                  );

                  element.style.setProperty(
                    '--tabs-padding-inline-start',
                    '5rem',
                  );
                });

              await page
                .locator('glide-core-tab-panel')
                .first()
                .evaluate<void, TabGroup>((element) => {
                  element.style.setProperty('--padding-inline-end', '5rem');
                  element.style.setProperty('--padding-inline-start', '5rem');
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          if (story.id.includes('with-overflow')) {
            test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.getByTestId('overflow-end-button').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          }

          test(
            '<glide-core-tab>.disabled',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-tab')
                .first()
                .evaluate<void, Tab>((element) => {
                  element.disabled = true;
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-tab>:focus',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-tab').first().focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test(
            '<glide-core-tab>:hover',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-tab').first().hover();

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
