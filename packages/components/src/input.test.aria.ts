import { expect, test } from '@playwright/test';
import type GlideCoreInput from './input.js';

test('clearable', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.clearable = true;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('hide-label', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('max-length', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.maxlength = 1;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('password-toggle', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.passwordToggle = true;
      element.type = 'password';
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="description"', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=input--input');

  await page
    .locator('glide-core-input')
    .evaluate<void, GlideCoreInput>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-input')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
