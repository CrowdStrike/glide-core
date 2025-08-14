import { expect, test } from './playwright/test.js';
import type TabGroup from './tab.group.js';
import type Tab from './tab.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Tab Group');

for (const story of stories) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('custom properties', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-tab-group')
            .evaluate<void, TabGroup>((element) => {
              element.style.setProperty('--tabs-padding-block-end', '5rem');

              element.style.setProperty('--tabs-padding-block-start', '5rem');

              element.style.setProperty('--tabs-padding-inline-end', '5rem');

              element.style.setProperty('--tabs-padding-inline-start', '5rem');
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
        });

        test(':hover', async ({ page }, test) => {
          // eslint-disable-next-line playwright/no-skipped-test
          test.skip(story.id !== 'tab-group--with-overflow');

          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.getByTestId('overflow-end-button').hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-tab>.disabled', async ({ page }, test) => {
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
        });

        test('<glide-core-tab>:focus', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-tab').first().focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('<glide-core-tab>:hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-tab').first().hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
