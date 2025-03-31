import { expect, test } from '@playwright/test';
import type GlideCoreButton from './button.js';

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=button--button');

  await page
    .locator('glide-core-button')
    .evaluate<void, GlideCoreButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=button--button');

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=button--button');

  await page
    .locator('glide-core-button')
    .evaluate<void, GlideCoreButton>((element) => {
      element.disabled = true;
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
