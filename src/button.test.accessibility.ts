import { html } from 'lit';
import type Button from './button.js';
import { expect, test } from '@/src/playwright/test.js';

test(
  'is accessible',
  { tag: '@accessibility' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-button
          label="Label"
          aria-description="Description"
        ></glide-core-button>`,
    );

    await expect(page).toBeAccessible('glide-core-button');

    const host = page.locator('glide-core-button');
    await setAttribute(host, 'aria-description', 'Description');

    await expect(host.getByRole('button')).toHaveAttribute(
      'aria-description',
      'Description',
    );
  },
);

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label"
  `);
});

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.disabled = true;
    element.tooltip = 'Tooltip';
  });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
    - tooltip "Tooltip"
  `);
});
