import { expect, test } from '@playwright/test';
import type GlideCoreMenu from './menu.js';
import type GlideCoreMenuButton from './menu.button.js';
import type GlideCoreMenuLink from './menu.link.js';

test('loading', async ({ page }, test) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .evaluate<void, GlideCoreMenu>((element) => {
      element.loading = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('open=${true}', async ({ page }, test) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .evaluate<void, GlideCoreMenu>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('open=${false}', async ({ page }, test) => {
  await page.goto('?id=menu--menu');
  await page.locator('glide-core-menu').waitFor();

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-menu-button>.disabled', async ({ page }, test) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .evaluate<void, GlideCoreMenu>((element) => {
      element.open = true;
    });

  await page
    .locator('glide-core-menu-button')
    .first()
    .evaluate<void, GlideCoreMenuButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-menu-link>.disabled', async ({ page }, test) => {
  await page.goto('?id=menu--menu');

  await page
    .locator('glide-core-menu')
    .evaluate<void, GlideCoreMenu>((element) => {
      element.open = true;
    });

  await page
    .locator('glide-core-menu-link')
    .first()
    .evaluate<void, GlideCoreMenuLink>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-menu')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
