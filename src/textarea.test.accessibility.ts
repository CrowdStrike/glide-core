import { expect, test } from '@playwright/test';
import type Textarea from './textarea.js';

test('disabled', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, Textarea>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label" [disabled]
  `);
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, Textarea>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
  `);
});

test('max-length', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, Textarea>((element) => {
      element.maxlength = 1;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - text: Character count 4 of 1
  `);
});

test('slot="description"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, Textarea>((element) => {
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

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, Textarea>((element) => {
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
