import { expect, test } from '@playwright/test';
import type GlideCorePopover from './popover.js';

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, GlideCorePopover>((element) => {
      element.disabled = true;
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=popover--popover');

  await page
    .locator('glide-core-popover')
    .evaluate<void, GlideCorePopover>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-popover')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
