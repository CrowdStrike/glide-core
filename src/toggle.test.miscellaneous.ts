import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-toggle label="Label"></glide-core-toggle>`,
  );

  const host = page.locator('glide-core-toggle');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-toggle');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-toggle label="Label"></glide-core-toggle>`,
    );

    const host = page.locator('glide-core-toggle');
    const switch$ = page.getByRole('switch');

    await callMethod(host, 'focus');

    await expect(switch$).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-toggle label="Label"></glide-core-toggle>`,
    );

    const host = page.locator('glide-core-toggle');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-toggle></glide-core-toggle>`),
    ).rejects.toThrow();
  },
);
