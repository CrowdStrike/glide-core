import { expect, test } from '@playwright/test';
import type Menu from './menu.js';
import Option from './option.js';

test('loading', async ({ page }) => {
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

test('open=${true}', async ({ page }) => {
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

test('open=${false}', async ({ page }) => {
  await page.goto('?id=menu--menu');
  await page.locator('glide-core-menu').first().waitFor();

  await expect(page.locator('glide-core-menu').first()).toMatchAriaSnapshot(`
    - button "Toggle"
  `);
});

test('<glide-core-options-group>', async ({ page }) => {
  await page.goto('?id=menu--with-groups');

  await page
    .locator('glide-core-menu')
    .first()
    .evaluate<void, Menu>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle":
      - group "A":
        - menuitem "One"
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
});

test('<glide-core-option>.description', async ({ page }) => {
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
});

test('<glide-core-option>.disabled', async ({ page }) => {
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
});

test('<glide-core-option>[slot="content"]', async ({ page }) => {
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
});
