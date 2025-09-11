import { expect, test } from './playwright/test.js';
import type TabGroupTab from './tab-group.tab.js';

test(
  '<glide-core-tab-group-tab>.disabled',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=tab-group--tab-group');

    await page
      .locator('glide-core-tab-group-tab')
      .first()
      .evaluate<void, TabGroupTab>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot(`
      - tablist:
        - tab "One" [disabled] [selected]
        - tab "Two"
      - tabpanel "One"
    `);
  },
);

test(
  '<glide-core-tab-group-tab>.selected',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=tab-group--tab-group');
    await page.locator('glide-core-tab-group').waitFor();

    await expect(page.locator('glide-core-tab-group')).toMatchAriaSnapshot(`
      - tablist:
        - tab "One" [selected]
        - tab "Two"
      - tabpanel "One"
    `);
  },
);
