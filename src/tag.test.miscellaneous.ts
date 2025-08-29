import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-tag label="Label"></glide-core-tag>`);

  const host = page.locator('glide-core-tag');

  await expect(host).toBeDefined('glide-core-tag');
});

test('can be removable', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-tag label="Label" removable></glide-core-tag>`,
  );

  const button = page.getByRole('button');

  await expect(button).toBeVisible();
  await expect(button).toHaveAttribute('aria-label', 'Remove tag: Label');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-tag label="Label" removable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await callMethod(host, 'focus');

    await expect(button).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(() => html`<glide-core-tag label="Label"></glide-core-tag>`);

    const host = page.locator('glide-core-tag');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-tag></glide-core-tag>`),
    ).rejects.toThrow();
  },
);
