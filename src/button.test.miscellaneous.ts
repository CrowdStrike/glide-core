import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(html`<glide-core-button label="Label"></glide-core-button>`);

  const host = page.locator('glide-core-button');

  await expect(host).toBeRegistered('glide-core-button');
});

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    expect(
      mount(html`<glide-core-button></glide-core-button>`),
    ).rejects.toThrow();

    const host = page.locator('glide-core-button');

    await expect(host).toBeRegistered('glide-core-button');
  },
);
