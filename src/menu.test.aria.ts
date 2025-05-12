import { expect, test } from '@playwright/test';
import type Menu from './menu.js';
import type MenuButton from './menu.button.js';
import type MenuLink from './menu.link.js';

test('loading', async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page.locator('glide-core-menu').evaluate<void, Menu>((element) => {
    element.loading = true;
    element.open = true;
  });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle"
  `);
});

test('open=${true}', async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page.locator('glide-core-menu').evaluate<void, Menu>((element) => {
    element.open = true;
  });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle":
      - menuitem "One":
        - button "One"
      - menuitem "Two":
        - button "Two"
      - menuitem "Three":
        - link "Three":
          - /url: /
  `);
});

test('open=${false}', async ({ page }) => {
  await page.goto('?id=menu--menu');
  await page.locator('glide-core-menu').waitFor();

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
  `);
});

test('<glide-core-menu-button>.disabled', async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page.locator('glide-core-menu').evaluate<void, Menu>((element) => {
    element.open = true;
  });

  await page
    .locator('glide-core-menu-button')
    .first()
    .evaluate<void, MenuButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle":
      - menuitem "One":
        - button "One" [disabled]
      - menuitem "Two":
        - button "Two"
      - menuitem "Three":
        - link "Three":
          - /url: /
  `);
});

test('<glide-core-menu-link>.disabled', async ({ page }) => {
  await page.goto('?id=menu--menu');

  await page.locator('glide-core-menu').evaluate<void, Menu>((element) => {
    element.open = true;
  });

  await page
    .locator('glide-core-menu-link')
    .first()
    .evaluate<void, MenuLink>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot(`
    - button "Toggle"
    - menu "Toggle":
      - menuitem "One":
        - button "One"
      - menuitem "Two":
        - button "Two"
      - menuitem "Three":
        - link "Three" [disabled]:
          - /url: /
  `);
});
