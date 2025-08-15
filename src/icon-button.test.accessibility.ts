import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type IconButton from './icon-button.js';

test(
  'is accessible',
  { tag: '@accessibility' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      html`<glide-core-icon-button label="Label" aria-description="Description">
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    await expect(page).toBeAccessible('glide-core-icon-button');

    const host = page.locator('glide-core-icon-button');
    await setAttribute(host, 'aria-description', 'Description');

    await expect(host.getByRole('button')).toHaveAttribute(
      'aria-description',
      'Description',
    );
  },
);

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=icon-button--icon-button');

  await page
    .locator('glide-core-icon-button')
    .evaluate<void, IconButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=icon-button--icon-button');

  await expect(page.locator('glide-core-icon-button')).toMatchAriaSnapshot(`
    - button "Label"
  `);
});
