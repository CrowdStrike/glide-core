import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Menu from './menu.js';
import Option from './option.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-menu>
        <button slot="target">One</button>

        <glide-core-options>
          <glide-core-option label="One">
            <glide-core-menu slot="submenu">
              <button slot="target">Two</button>

              <glide-core-options>
                <glide-core-option label="Two"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </glide-core-option>

          <glide-core-option label="Three" href="/"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>`,
  );

  await expect(page).toBeAccessible('glide-core-menu');
});

test(
  'sets basic accessibility attributes on its slotted content',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const menus = page.getByRole('menu');

    const firstButtonId = await page
      .getByRole('button')
      .nth(0)
      .evaluate((element) => element.id);

    const secondButtonId = await page
      .getByRole('button')
      .nth(1)
      .evaluate((element) => element.id);

    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(1)).not.toHaveAttribute('aria-expanded');

    await expect(menus.nth(0)).toHaveAttribute(
      'aria-labelledby',
      firstButtonId,
    );

    await expect(menus.nth(1)).toHaveAttribute(
      'aria-labelledby',
      secondButtonId,
    );
  },
);

test(
  'sets `tabindex` on its target when it is a SPAN',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <button slot="target">Label</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option
          ></glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('tabindex', '0');
  },
);

test(
  'sets `tabindex` on its target when it is a DIV',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <div role="button" slot="target">Label</div>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('tabindex', '0');
  },
);

test(
  'sets `tabindex` on its target when it is an SVG',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <svg
            fill="none"
            height="1rem"
            role="button"
            slot="target"
            stroke-width="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            width="1rem"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
            />
          </svg>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('tabindex', '0');
  },
);

test(
  'sets `aria-haspopup` on its target when `role="menu"`',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <div role="button" slot="target">Label</div>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('aria-haspopup', 'true');
  },
);

test(
  'sets `aria-haspopup` on its target when `role="listbox"`',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    /* eslint-disable lit-a11y/accessible-name */
    await mount(
      () =>
        html`<glide-core-menu>
          <div role="button" slot="target">Label</div>

          <glide-core-options role="listbox">
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  },
);

test(
  'sets `aria-haspopup` on its sub-Menu Option`',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const menuitems = page.getByRole('menuitem');

    await expect(menuitems.nth(0)).toHaveAttribute('aria-haspopup', 'true');
  },
);

test(
  'does not set `aria-haspopup` on its sub-Menu target`',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');

    await expect(buttons.nth(1)).not.toHaveAttribute('aria-haspopup');
  },
);

test(
  'makes sub-Menu targets unfocusable by the user',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target" tabindex="0">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two">
                    <glide-core-menu slot="submenu" open>
                      <button slot="target">Three</button>

                      <glide-core-options>
                        <glide-core-option label="Three"></glide-core-option>
                      </glide-core-options>
                    </glide-core-menu>
                  </glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');

    await expect(buttons.nth(1)).toHaveAttribute('tabindex', '-1');
    await expect(buttons.nth(2)).toHaveAttribute('tabindex', '-1');
  },
);

test('loading', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .first()
    .evaluate<void, Menu>((element) => {
      element.loading = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle"
  `);
});

test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .first()
    .evaluate<void, Menu>((element) => {
      element.open = true;
    });

  await page
    .locator('glide-core-menu glide-core-menu')
    .evaluate<void, Menu>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle":
      - menuitem "One" [expanded]:
        - menu:
          - menuitem "Four"
          - menuitem "Five"
          - menuitem "Six"
      - menuitem "Two"
      - menuitem "Three":
        - link "Three":
          - /url: /
  `);
});

test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=menu--menu');
  await page.locator('glide-core-menu').first().waitFor();

  await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
    - button "Toggle"
  `);
});

test(
  '<glide-core-options-group>',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=menu--with-groups');

    await page
      .locator('glide-core-menu')
      .first()
      .evaluate<void, Menu>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-menu glide-core-menu')
      .evaluate<void, Menu>((element) => {
        element.open = true;
      });

    await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
      - button "Toggle"
      - menu "Toggle":
        - group "A":
          - menuitem "One" [expanded]:
            - menu:
              - menuitem "Ten"
              - menuitem "Eleven"
              - menuitem "Twelve"
          - menuitem "Two"
          - menuitem "Three"
        - group "B":
          - menuitem "Four"
          - menuitem "Five"
          - menuitem "Six"
        - group "C":
          - menuitem "Seven"
          - menuitem "Eight"
          - menuitem "Nine":
            - link "Nine":
              - /url: /
    `);
  },
);

test(
  '<glide-core-option>.description',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=menu--menu');

    await page
      .locator('glide-core-menu')
      .first()
      .evaluate<void, Menu>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-option')
      .first()
      .evaluate<void, Option>((element) => {
        element.description = 'Description';
      });

    await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
      - button "Toggle"
      - menu "Toggle":
        - menuitem "One Description"
        - menuitem "Two"
        - menuitem "Three":
          - link "Three":
            - /url: /
    `);
  },
);

test(
  '<glide-core-option>.disabled',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=menu--menu');

    await page
      .locator('glide-core-menu')
      .first()
      .evaluate<void, Menu>((element) => {
        element.open = true;
      });

    await page
      .locator('glide-core-option')
      .first()
      .evaluate<void, Option>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
      - button "Toggle"
      - menu "Toggle":
        - menuitem "One" [disabled]
        - menuitem "Two"
        - menuitem "Three":
          - link "Three":
            - /url: /
    `);
  },
);

test(
  '<glide-core-option>[slot="content"]',
  { tag: '@accessibility' },
  async ({ page }) => {
    await page.goto('?id=menu--menu');

    await page
      .locator('glide-core-menu')
      .first()
      .evaluate<void, Menu>((element) => {
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

    await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
      - button "Toggle"
      - menu "Toggle":
        - menuitem "One"
        - menuitem "Two"
        - menuitem "Three":
          - link "Three":
            - /url: /
    `);
  },
);
