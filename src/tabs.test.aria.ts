import { expect, test } from '@playwright/test';
import type TabsTab from './tabs.tab.js';

test('<glide-core-tabs-tab>.disabled', async ({ page }) => {
  await page.goto('?id=tabs--tabs');

  await page
    .locator('glide-core-tabs-tab')
    .first()
    .evaluate<void, TabsTab>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-tabs')).toMatchAriaSnapshot(`
    - tablist:
      - tab "One" [disabled] [selected]
      - tab "Two"
    - tabpanel "One": Panel
  `);
});

test('<glide-core-tabs-tab>.selected', async ({ page }) => {
  await page.goto('?id=tabs--tabs');
  await page.locator('glide-core-tabs').waitFor();

  await expect(page.locator('glide-core-tabs')).toMatchAriaSnapshot(`
    - tablist:
      - tab "One" [selected]
      - tab "Two"
    - tabpanel "One": Panel
  `);
});
