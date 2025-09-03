import { expect, test } from './playwright/test.js';
import type Select from './select.js';
import type Menu from './menu.js';
import Option from './option.js';

test('loading', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=select--select');

  await page.locator('glide-core-select').evaluate<void, Select>((element) => {
    element.loading = true;
    element.open = true;
  });

  await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
    - button "Toggle"
    - listbox "Toggle"
  `);
});

test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=select--select');

  await page.locator('glide-core-select').evaluate<void, Select>((element) => {
    element.value = ['one'];
    element.open = true;
  });

  await page
    .locator('glide-core-option glide-core-menu')
    .evaluate<void, Menu>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
    - button "Toggle" [expanded]
    - listbox "Toggle":
      - option "One" [selected]:
        - menu:
          - menuitem "Four"
          - menuitem "Five"
          - menuitem "Six"
      - option "Two"
      - option "Three"
  `);
});

test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=select--select');

  await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
    - button "Toggle"
  `);
});

test(
  '<glide-core-options-group>',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=select--with-groups');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.value = ['one'];
        element.open = true;
      });

    await page
      .locator('glide-core-option glide-core-menu')
      .evaluate<void, Select>((element) => {
        element.open = true;
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - button "Toggle"
      - listbox "Toggle":
        - group "A":
          - option "One" [selected]:
            - menu:
              - menuitem "Ten"
              - menuitem "Eleven"
              - menuitem "Twelve"
          - option "Two"
          - option "Three"
        - group "B":
          - option "Four"
          - option "Five"
          - option "Six"
        - group "C":
          - option "Seven"
          - option "Eight"
          - option "Nine"
    `);
  },
);

test(
  '<glide-core-option>.description',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=select--select');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-option')
      .first()
      .evaluate<void, Option>((element) => {
        element.description = 'Description';
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - button "Toggle"
      - listbox "Toggle":
        - option "One Description"
        - option "Two"
        - option "Three"
    `);
  },
);

test(
  '<glide-core-option>.disabled',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=select--select');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-option')
      .first()
      .evaluate<void, Option>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - button "Toggle"
      - listbox "Toggle":
        - option "One" [disabled]
        - option "Two"
        - option "Three"
    `);
  },
);

test(
  '<glide-core-option>[slot="content"]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=select--select');

    await page
      .locator('glide-core-select')
      .evaluate<void, Select>((element) => {
        element.value = ['one'];
        element.open = true;
      });

    await page
      .locator('glide-core-option')
      .first()
      .evaluate<void, Option>((element) => {
        const content = document.createElement('div');

        content.slot = 'content';
        content.textContent = 'One';

        element.append(content);
      });

    await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
      - button "Toggle" [expanded]
      - listbox "Toggle":
        - option "One" [selected]
        - option "Two"
        - option "Three"
    `);
  },
);
