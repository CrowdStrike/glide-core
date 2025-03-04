import { expect, test } from '@playwright/test';
import type GlideCoreTabGroup from './tab.group.js';
import type GlideCoreTab from './tab.js';

test.describe('tab-group--tabs', () => {
  test.describe('globals=theme:light', () => {
    test('custom properties', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab-group')
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--tabs-padding-block-end', '5rem');
          element.style.setProperty('--tabs-padding-block-start', '5rem');
          element.style.setProperty('--tabs-padding-inline-end', '5rem');
          element.style.setProperty('--tabs-padding-inline-start', '5rem');
        });

      await page
        .locator('glide-core-tab-panel')
        .first()
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--padding-inline-end', '5rem');
          element.style.setProperty('--padding-inline-start', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tab>.disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab')
        .first()
        .evaluate<void, GlideCoreTab>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('custom properties', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab-group')
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--tabs-padding-block-end', '5rem');
          element.style.setProperty('--tabs-padding-block-start', '5rem');
          element.style.setProperty('--tabs-padding-inline-end', '5rem');
          element.style.setProperty('--tabs-padding-inline-start', '5rem');
        });

      await page
        .locator('glide-core-tab-panel')
        .first()
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--padding-inline-end', '5rem');
          element.style.setProperty('--padding-inline-start', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tab>.disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab')
        .first()
        .evaluate<void, GlideCoreTab>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('tab-group--with-overflow', () => {
  test.describe('globals=theme:light', () => {
    test('custom properties', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab-group')
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--tabs-padding-block-end', '5rem');
          element.style.setProperty('--tabs-padding-block-start', '5rem');
          element.style.setProperty('--tabs-padding-inline-end', '5rem');
          element.style.setProperty('--tabs-padding-inline-start', '5rem');
        });

      await page
        .locator('glide-core-tab-panel')
        .first()
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--padding-inline-end', '5rem');
          element.style.setProperty('--padding-inline-start', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tab>.disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab')
        .first()
        .evaluate<void, GlideCoreTab>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('custom properties', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab-group')
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--tabs-padding-block-end', '5rem');
          element.style.setProperty('--tabs-padding-block-start', '5rem');
          element.style.setProperty('--tabs-padding-inline-end', '5rem');
          element.style.setProperty('--tabs-padding-inline-start', '5rem');
        });

      await page
        .locator('glide-core-tab-panel')
        .first()
        .evaluate<void, GlideCoreTabGroup>((element) => {
          element.style.setProperty('--padding-inline-end', '5rem');
          element.style.setProperty('--padding-inline-start', '5rem');
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-tab>.disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-tab')
        .first()
        .evaluate<void, GlideCoreTab>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
