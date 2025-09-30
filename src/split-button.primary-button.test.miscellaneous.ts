import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>`,
  );

  const host = page.locator('glide-core-split-button-primary-button');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-split-button-primary-button',
  );
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>`,
    );

    const host = page.locator('glide-core-split-button-primary-button');
    const button = page.getByRole('button');

    await callMethod(host, 'focus');

    await expect(button).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>`,
    );

    const host = page.locator('glide-core-split-button-primary-button');

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
          html`<glide-core-split-button-primary-button></glide-core-split-button-primary-button>`,
      ),
    ).rejects.toThrow();
  },
);
