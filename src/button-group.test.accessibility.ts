import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type ButtonGroupButton from './button-group.button.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-button-group label="Label">
        <glide-core-button-group-button
          label="One"
          value="one"
        ></glide-core-button-group-button>

        <glide-core-button-group-button
          label="Two"
          value="two"
        ></glide-core-button-group-button>
      </glide-core-button-group>`,
  );

  // It's unfortunate to ignore this rule. But the hidden label doesn't meet color
  // contrast requirements. Axe has an `ignoreTags` but no `ignoreSelectors`.
  await expect(page).toBeAccessible('glide-core-button-group', [
    'color-contrast',
  ]);
});

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
