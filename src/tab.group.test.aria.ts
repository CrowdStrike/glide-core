import { expect, test } from '@playwright/test';
import type Tab from './tab.js';

test('<glide-core-tab>.disabled', async ({ page }) => {
  await page.goto('?id=tab-group--tabs');

  await page
    .locator('glide-core-tab')
    .first()
    .evaluate<void, Tab>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot(`
    - tablist:
      - tab "Tab" [disabled] [selected]
      - tab "With Icon"
    - tabpanel "Tab": Panel
  `);
});

test('<glide-core-tab>.selected', async ({ page }) => {
  await page.goto('?id=tab-group--tabs');
  await page.locator('glide-core-tab-group').waitFor();

  await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot(`
    - tablist:
      - tab "Tab" [selected]
      - tab "With Icon"
    - tabpanel "Tab": Panel
  `);
});
