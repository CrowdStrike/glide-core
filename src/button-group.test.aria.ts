import { expect, test } from '@playwright/test';
import type GlideCoreButtonGroupButton from './button-group.button.js';

test('<glide-core-button-group-button>[disabled=${true}]', async ({ page }) => {
  await page.goto('?id=button-group--button-group');

  await page
    .locator('glide-core-button-group-button')
    .first()
    .evaluate<void, GlideCoreButtonGroupButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [checked] [disabled]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-button-group-button>[disabled=${false}]', async ({
  page,
}) => {
  await page.goto('?id=button-group--button-group');

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [checked]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-button-group-button>[selected=${true}]', async ({ page }) => {
  await page.goto('?id=button-group--button-group');

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One" [checked]
      - radio "Two"
      - radio "Three"
  `);
});

test('<glide-core-button-group-button>[selected=${false}]', async ({
  page,
}) => {
  await page.goto('?id=button-group--button-group');

  await page
    .locator('glide-core-button-group-button')
    .first()
    .evaluate<void, GlideCoreButtonGroupButton>((element) => {
      element.selected = false;
    });

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot(`
    - text: Label
    - radiogroup "Label":
      - radio "One"
      - radio "Two"
      - radio "Three"
  `);
});
