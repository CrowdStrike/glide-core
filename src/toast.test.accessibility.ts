import { expect, test } from './playwright/test.js';
import type Button from './button.js';

test('variant="informational"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toast--toast');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.dataset.description = 'Description';
  });

  await page.locator('glide-core-button').click();

  await expect(page.locator('glide-core-private-toasts')).toMatchAriaSnapshot(`
    - region "Notifications":
      - alert:
        - text: "Informational: Label"
        - button "Dismiss"
        - text: Description
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
      - alert:
        - text: "Success: Label"
        - button "Dismiss"
        - text: Description
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
      - alert:
        - text: "Error: Label"
        - button "Dismiss"
        - text: Description
  `);
});
