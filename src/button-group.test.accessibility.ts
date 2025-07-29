import { expect, test } from './playwright/test.js';
import type ButtonGroupButton from './button-group.button.js';

test(
  '<glide-core-button-group-button>[disabled=${true}]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=button-group--button-group');

    await page
      .locator('glide-core-button-group-button')
      .first()
      .evaluate<void, ButtonGroupButton>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
      - text: Label
      - radiogroup "Label":
        - radio "One" [checked] [disabled]
        - radio "Two"
        - radio "Three"
    `);
  },
);

test(
  '<glide-core-button-group-button>[disabled=${false}]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=button-group--button-group');

    await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
      - text: Label
      - radiogroup "Label":
        - radio "One" [checked]
        - radio "Two"
        - radio "Three"
    `);
  },
);

test(
  '<glide-core-button-group-button>[selected=${true}]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=button-group--button-group');

    await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
      - text: Label
      - radiogroup "Label":
        - radio "One" [checked]
        - radio "Two"
        - radio "Three"
    `);
  },
);

test(
  '<glide-core-button-group-button>[selected=${false}]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=button-group--button-group');

    await page
      .locator('glide-core-button-group-button')
      .first()
      .evaluate<void, ButtonGroupButton>((element) => {
        element.selected = false;
      });

    await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
      - text: Label
      - radiogroup "Label":
        - radio "One"
        - radio "Two"
        - radio "Three"
    `);
  },
);
