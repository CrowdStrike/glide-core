import { expect, test } from '@playwright/test';
import type GlideCoreLink from './link.js';

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=link--link');

  await page
    .locator('glide-core-link')
    .evaluate<void, GlideCoreLink>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=link--link');

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
