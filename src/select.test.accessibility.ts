import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Select from './select.js';
import type Menu from './menu.js';
import Option from './option.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    html`<glide-core-select open>
      <button slot="target">Target</button>

      <glide-core-options>
        <glide-core-options-group label="A">
          <glide-core-option label="One" selected>
            <glide-core-menu slot="submenu">
              <span slot="target">☀</span>

              <glide-core-options>
                <glide-core-option label="Five"></glide-core-option>
                <glide-core-option label="Six"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </glide-core-option>

          <glide-core-option label="Two"></glide-core-option>
        </glide-core-options-group>

        <glide-core-options-group label="B">
          <glide-core-option label="Three"></glide-core-option>
          <glide-core-option label="Four"></glide-core-option>
        </glide-core-options-group>
      </glide-core-options>
    </glide-core-select>`,
  );

  await expect(page).toBeAccessible('glide-core-select', [
    // TODO: explain each
    'aria-allowed-attr',
    'nested-interactive',
  ]);

  await mount(
    html`<glide-core-select loading open>
      <button slot="target">Target</button>
      <glide-core-options></glide-core-options>
    </glide-core-select>`,
  );

  await expect(page).toBeAccessible('glide-core-select');
});

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
    element.open = true;
  });

  await page
    .locator('glide-core-option glide-core-menu')
    .evaluate<void, Menu>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-select')).toMatchAriaSnapshot(`
    - button "Toggle"
    - listbox "Toggle":
      - option "One":
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
          - option "One":
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
      - button "Toggle"
      - listbox "Toggle":
        - option "One"
        - option "Two"
        - option "Three"
    `);
  },
);
