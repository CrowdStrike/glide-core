import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-modal label="Label"></glide-core-modal>`);

  const host = page.locator('glide-core-modal');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-modal');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-modal label="Label"></glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');

    await callMethod(host, 'focus');

    await expect(host).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-modal label="Label"></glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-modal></glide-core-modal>`),
    ).rejects.toThrow();
  },
);
