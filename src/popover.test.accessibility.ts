import { expect, test } from './playwright/test.js';
import type Popover from './popover.js';
import type PopoverContainer from './popover.container.js';

test('disabled', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, Popover>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=popover--popover');
  await page.locator('glide-core-popover').waitFor();

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
    - button
  `);
});

test(
  '<glide-core-popover-container>[role="dialog"]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=popover--popover');

    await page
      .locator('glide-core-popover')
      .evaluate<void, Popover>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-popover-container')
      .evaluate<void, PopoverContainer>((element) => {
        element.role = 'dialog';
      });

    await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot(`
      - button "Target" [expanded]
      - dialog: Content
    `);
  },
);
