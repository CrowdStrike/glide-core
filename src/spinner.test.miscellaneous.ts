import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-spinner label="Label"></glide-core-spinner>`,
  );

  const host = page.locator('glide-core-spinner');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-spinner');
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-spinner label="Label"></glide-core-spinner>`,
    );

    const host = page.locator('glide-core-spinner');

    await expect(host).not.toBeExtensible();
  },
);
