import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
  );

  const host = page.locator('glide-core-link');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-link');
});

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-link></glide-core-link>`),
    ).rejects.toThrow();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
    );

    const host = page.locator('glide-core-link');

    await expect(host).not.toBeExtensible();
  },
);
