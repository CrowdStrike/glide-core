import { expect, test } from '@playwright/test';
import type GlideCoreTooltip from './tooltip.js';

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=tooltip--tooltip');

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, GlideCoreTooltip>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=tooltip--tooltip');
  await page.locator('glide-core-tooltip').waitFor();

  await page
    .locator('glide-core-tooltip')
    .evaluate<void, GlideCoreTooltip>((element) => {
      element.open = true;
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-tooltip')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
