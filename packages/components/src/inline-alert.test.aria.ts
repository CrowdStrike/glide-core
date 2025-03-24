import { expect, test } from '@playwright/test';
import type GlideCoreInlineAlert from './inline-alert.js';

test('removable=${true}', async ({ page }, test) => {
  await page.goto('?id=inline-alert--inline-alert');

  await page
    .locator('glide-core-inline-alert')
    .evaluate<void, GlideCoreInlineAlert>((element) => {
      element.removable = true;
    });

  await expect(page.locator('glide-core-inline-alert')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('removable=${false}', async ({ page }, test) => {
  await page.goto('?id=inline-alert--inline-alert');

  await expect(page.locator('glide-core-inline-alert')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
