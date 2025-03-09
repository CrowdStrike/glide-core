import { expect, test } from '@playwright/test';
import type GlideCoreDropdown from './dropdown.js';

test.describe('dropdown--dropdown', () => {
  test('disabled=${true}', async ({ page }, test) => {
    await page.goto(`?id=${test.titlePath.at(1)}`);

    await page
      .locator('glide-core-dropdown')
      .evaluate<void, GlideCoreDropdown>((element) => {
        element.open = true;
        element.filterable = true;
      });

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });

  test('disabled=${false}', async ({ page }, test) => {
    await page.goto(`?id=${test.titlePath.at(1)}`);

    await expect(page.locator('glide-core-dropdown')).toMatchAriaSnapshot({
      name: `${test.titlePath.join('.')}.yml`,
    });
  });
});
