import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-inline-alert variant="informational">
        Label
      </glide-core-inline-alert>`,
  );

  const host = page.locator('glide-core-inline-alert');

  await expect(host).toBeDefined('glide-core-inline-alert');
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-inline-alert variant="informational">
          Label
        </glide-core-inline-alert>`,
    );

    const host = page.locator('glide-core-inline-alert');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-inline-alert></glide-core-inline-alert>`),
    ).rejects.toThrow();
  },
);
