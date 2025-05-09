import { expect, test } from '@playwright/test';
import type RadioGroup from './radio-group.js';
import type RadioGroupRadio from './radio-group.radio.js';

test('disabled', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, RadioGroup>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [disabled]
      - radio "Two" [disabled]
      - radio "Three" [disabled]
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, RadioGroup>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label Description":
      - radio "One" [checked]
      - radio "Two"
      - radio "Three"
    - text: Description
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, RadioGroup>((element) => {
      element.tooltip = 'Tooltip';
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - text: Label
    - radiogroup "Label":
      - radio "One" [checked]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-radio-group-radio>.disabled', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group-radio')
    .first()
    .evaluate<void, RadioGroupRadio>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [disabled]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-radio-group-radio>[checked=${true}]', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [checked]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-radio-group-radio>[checked=${false}]', async ({ page }) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group-radio')
    .first()
    .evaluate<void, RadioGroupRadio>((element) => {
      element.checked = false;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One"
      - radio "Two"
      - radio "Three"
  `);
});
