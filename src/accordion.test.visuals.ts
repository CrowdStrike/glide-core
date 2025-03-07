import { expect, test } from '@playwright/test';
import type GlideCoreAccordion from './accordion.js';

test.describe('accordion--accordion', () => {
  test.describe('globals=theme:light', () => {
    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-accordion').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-accordion')
        .evaluate<void, GlideCoreAccordion>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-accordion').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-accordion')
        .evaluate<void, GlideCoreAccordion>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('accordion--with-icons', () => {
  test.describe('globals=theme:light', () => {
    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-accordion').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-accordion')
        .evaluate<void, GlideCoreAccordion>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('open=${false}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-accordion').waitFor();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open=${true}', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-accordion')
        .evaluate<void, GlideCoreAccordion>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
