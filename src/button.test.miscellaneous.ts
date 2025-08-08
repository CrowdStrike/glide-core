import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(html`<glide-core-button label="Label"></glide-core-button>`);

  const host = page.locator('glide-core-button');

  await expect(host).toBeRegistered('glide-core-button');
});

test(
  'receives focus when focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');

    await callMethod(host, 'focus');
    await expect(host).toBeFocused();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`<glide-core-button></glide-core-button>`),
    ).rejects.toThrow();
  },
);
