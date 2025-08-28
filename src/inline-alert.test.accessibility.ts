import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-inline-alert variant="informational">
        Label
      </glide-core-inline-alert>`,
  );

  await expect(page).toBeAccessible('glide-core-inline-alert');
});

// Not sure what to name this test. It's not really testing
// `variant="informational"`. It's testing the component in its default
// state because there aren't specific attributes that need to be tested.
test('variant="informational"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=inline-alert--inline-alert');

  await expect(page.locator('glide-core-inline-alert')).toMatchAriaSnapshot(`
    - 'alert "Severity: Informational"'
  `);
});
