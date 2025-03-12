import { expect, test } from '@playwright/test';
import type GlideCoreModal from './modal.js';

test('open', async ({ page }, test) => {
  await page.goto('?id=modal--modal');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('severity="informational"', async ({ page }, test) => {
  await page.goto('?id=modal--modal');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
      element.severity = 'informational';
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('severity="medium"', async ({ page }, test) => {
  await page.goto('?id=modal--modal');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
      element.severity = 'medium';
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('severity="critical"', async ({ page }, test) => {
  await page.goto('?id=modal--modal');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
      element.severity = 'critical';
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="header-actions"', async ({ page }, test) => {
  await page.goto('?id=modal--with-header-actions');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="primary"', async ({ page }, test) => {
  await page.goto('?id=modal--with-primary-button');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="secondary"', async ({ page }, test) => {
  await page.goto('?id=modal--with-secondary-button');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="tertiary"', async ({ page }, test) => {
  await page.goto('?id=modal--with-tertiary-tooltip-and-button');

  await page
    .locator('glide-core-modal')
    .evaluate<void, GlideCoreModal>((element) => {
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-modal')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
