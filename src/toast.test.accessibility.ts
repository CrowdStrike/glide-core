import { expect, test } from '@playwright/test';
import type Button from './button.js';

test('variant="informational"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toast--toast');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.dataset.description = 'Description';
  });

  await page.locator('glide-core-button').click();

  await expect(page.locator('glide-core-private-toasts')).toMatchAriaSnapshot(`
    - region "Notifications":
      - 'alert "Informational: Label Description"':
        - button "Dismiss"
  `);
});

test('variant="success"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toast--toast');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.dataset.description = 'Description';
    element.dataset.variant = 'success';
  });

  await page.locator('glide-core-button').click();

  await expect(page.locator('glide-core-private-toasts')).toMatchAriaSnapshot(`
    - region "Notifications":
      - 'alert "Success: Label Description"':
        - button "Dismiss"
  `);
});

test('variant="error"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toast--toast');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.dataset.description = 'Description';
    element.dataset.variant = 'error';
  });

  await page.locator('glide-core-button').click();

  await expect(page.locator('glide-core-private-toasts')).toMatchAriaSnapshot(`
    - region "Notifications":
      - 'alert "Error: Label Description"':
        - button "Dismiss"
  `);
});
