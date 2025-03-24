import { expect, test } from '@playwright/test';
import type GlideCoreTextarea from './textarea.js';

test('disabled', async ({ page }, test) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('hide-label', async ({ page }, test) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('max-length', async ({ page }, test) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.maxlength = 1;
    });

  await page.getByRole('textbox').fill('Test');

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="description"', async ({ page }, test) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=textarea--textarea');

  await page
    .locator('glide-core-textarea')
    .evaluate<void, GlideCoreTextarea>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-textarea')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
