import { expect, test } from '@playwright/test';
import type GlideCoreToasts from './toasts.js';

test('informational', async ({ page }, test) => {
  await page.goto('?id=toasts--toasts');

  await page
    .locator('glide-core-toasts')
    .evaluate<void, GlideCoreToasts>((element) => {
      element.add({
        label: 'Label',
        description: 'Description',
        variant: 'informational',
      });
    });

  await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('success', async ({ page }, test) => {
  await page.goto('?id=toasts--toasts');

  await page
    .locator('glide-core-toasts')
    .evaluate<void, GlideCoreToasts>((element) => {
      element.add({
        label: 'Label',
        description: 'Description',
        variant: 'success',
      });
    });

  await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('error', async ({ page }, test) => {
  await page.goto('?id=toasts--toasts');

  await page
    .locator('glide-core-toasts')
    .evaluate<void, GlideCoreToasts>((element) => {
      element.add({
        label: 'Label',
        description: 'Description',
        variant: 'error',
      });
    });

  await expect(page.locator('glide-core-toasts')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
