import { expect, test } from '@playwright/test';
import type GlideCoreTextarea from './textarea.js';

test('disabled', async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label" [disabled]
  `);
});

test('hide-label', async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
  `);
});

test('max-length', async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.maxlength = 1;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - text: Character count 4 of 1
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - text: Description
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - textbox "Label"
  `);
});
