import { expect, test } from '@playwright/test';
import type GlideCoreInput from './input.js';

test('clearable', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.clearable = true;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - button "Clear Label entry"
  `);
});

test('disabled', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label" [disabled]
  `);
});

test('hide-label', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
  `);
});

test('max-length', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.maxlength = 1;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - text: Character count 4 of 1
  `);
});

test('password-toggle', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.passwordToggle = true;
      element.type = 'password';
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - button "Show password"
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - text: Label
    - textbox "Label"
    - text: Description
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - textbox "Label"
  `);
});
