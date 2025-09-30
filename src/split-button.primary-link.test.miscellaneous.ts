import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-split-button-primary-link
        label="Label"
      ></glide-core-split-button-primary-link>`,
  );

  const host = page.locator('glide-core-split-button-primary-link');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-split-button-primary-link',
  );
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-primary-link
          label="Label"
          href="/"
        ></glide-core-split-button-primary-link>`,
    );

    const host = page.locator('glide-core-split-button-primary-link');
    const link = page.getByRole('link');

    await callMethod(host, 'focus');

    await expect(link).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-primary-link
          label="Label"
        ></glide-core-split-button-primary-link>`,
    );

    const host = page.locator('glide-core-split-button-primary-link');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button-primary-link></glide-core-split-button-primary-link>`,
      ),
    ).rejects.toThrow();
  },
);
