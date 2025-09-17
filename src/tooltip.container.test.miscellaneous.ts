import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-private-tooltip-container></glide-core-private-tooltip-container>`,
  );

  const host = page.locator('glide-core-private-tooltip-container');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-private-tooltip-container',
  );
});

test(
  'can have a single-key shortcut',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container
          .shortcut=${['CMD']}
        ></glide-core-private-tooltip-container>`,
    );

    const shortcut = page.getByTestId('shortcut');

    await expect(shortcut).toHaveText('CMD');
  },
);

test(
  'can have a multi-key shortcut',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container
          .shortcut=${['CMD', 'K']}
        ></glide-core-private-tooltip-container>`,
    );

    const shortcut = page.getByTestId('shortcut');

    await expect(shortcut).toHaveText('CMD + K');
  },
);
