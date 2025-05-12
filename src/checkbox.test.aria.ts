import { expect, test } from '@playwright/test';
import type Checkbox from './checkbox.js';

test('checked=${true}', async ({ page }) => {
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

test('checked=${false}', async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
  `);
});

test('disabled=${true}', async ({ page }) => {
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

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=checkbox--checkbox');

  await expect(page.locator('glide-core-checkbox')).toMatchAriaSnapshot(`
    - text: Label
    - checkbox "Label"
  `);
});

test('hide-label', async ({ page }) => {
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

test('indeterminate', async ({ page }) => {
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

test('slot="description"', async ({ page }) => {
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

test('summary', async ({ page }) => {
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

test('tooltip', async ({ page }) => {
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
