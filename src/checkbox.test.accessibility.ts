import { expect, test } from '@playwright/test';
import type Checkbox from './checkbox.js';

test('checked=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.checked = true;
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label" [checked]
  `);
});

test('checked=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
  `);
});

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
  `);
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
  `);
});

test('indeterminate', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.indeterminate = true;
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label" [checked=mixed]
  `);
});

test('slot="description"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
    - text: Description
  `);
});

test('summary', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.summary = 'Summary';
    });

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
    - text: Summary
  `);
});

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await page
    .locator('glide-core-checkbox')
    .evaluate<void, Checkbox>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - checkbox "Label"
  `);
});
