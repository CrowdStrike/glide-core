import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Button from './button.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-button
        label="Label"
        aria-description="Description"
      ></glide-core-button>`,
  );

  await expect(page).toBeAccessible('glide-core-button');
});

test(
  'sets `aria-description` on its button when set initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button
          label="Label"
          aria-description="Description"
        ></glide-core-button>`,
    );

    const host = page.locator('glide-core-button');

    await expect(host.getByRole('button')).toHaveAttribute(
      'aria-description',
      'Description',
    );
  },
);

test(
  'sets `aria-description` on its button when set programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      () => html`<glide-core-button label="Label"></glide-core-button>`,
    );

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

test('loading', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=button--button');

  await page.locator('glide-core-button').evaluate<void, Button>((element) => {
    element.loading = true;
  });

  await expect(page.locator('glide-core-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]:
      - progressbar "Loading"
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
