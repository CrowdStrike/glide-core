import { expect, test } from '@playwright/test';
import type Button from './button.js';

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label"
  `);
});

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.disabled = true;
    element.tooltip = 'Tooltip';
  });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
    - tooltip "Tooltip"
  `);
});
