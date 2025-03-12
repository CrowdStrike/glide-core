import { expect, test } from '@playwright/test';
import type GlideCoreButtonGroupButton from './button-group.button.js';

test('<glide-core-button-group-button>[disabled=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=button-group--button-group');

  await page
    .locator('glide-core-button-group-button')
    .first()
    .evaluate<void, GlideCoreButtonGroupButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-button-group-button>[disabled=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=button-group--button-group');

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-button-group-button>[selected=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=button-group--button-group');

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-button-group-button>[selected=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=button-group--button-group');

  await page
    .locator('glide-core-button-group-button')
    .first()
    .evaluate<void, GlideCoreButtonGroupButton>((element) => {
      element.selected = false;
    });

  await expect(page.locator('glide-core-button-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
