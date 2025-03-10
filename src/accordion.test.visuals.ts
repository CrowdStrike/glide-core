import { expect, test } from '@playwright/test';
import type GlideCoreAccordion from './accordion.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Accordion) {
  test.describe(story, () => {
    test('open=${false}', async ({ page }, test) => {
      await page.goto(story);
      await page.locator('glide-core-accordion').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${true}', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-accordion')
        .evaluate<void, GlideCoreAccordion>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
