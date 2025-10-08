import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Label from './label.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-label tooltip="Tooltip">
        <label for="input">Label</label>
        <input id="input" slot="control" />
        <div slot="summary">Summary</div>
        <div slot="description">Description</div>
      </glide-core-label>`,
  );

  await expect(page).toBeAccessible('glide-core-label');
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=label--label');

  await page.locator('glide-core-label').evaluate<void, Label>((element) => {
    element.hideLabel = true;
  });

  await expect(page.locator('glide-core-label')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
  `);
});

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=label--label');

  await page.locator('glide-core-label').evaluate<void, Label>((element) => {
    element.tooltip = 'Tooltip';
  });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-label')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - textbox "Label"
  `);
});
