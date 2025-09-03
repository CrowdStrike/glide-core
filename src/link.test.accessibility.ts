import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Link from './link.js';

test(
  'is accessible',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
    );

    await expect(page).toBeAccessible('glide-core-link');
  },
);

test(
  'is accessible when disabled',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-link
          label="Label"
          href="/"
          disabled
        ></glide-core-link>`,
    );

    await expect(page).toBeAccessible('glide-core-link');
  },
);

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=link--link');

  await page.locator('glide-core-link').evaluate<void, Link>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot(`
    - link "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=link--link');

  await expect(page.locator('glide-core-link')).toMatchAriaSnapshot(`
    - link "Label":
      - /url: /
  `);
});
