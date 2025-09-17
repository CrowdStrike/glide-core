import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'has a role when enabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container></glide-core-private-tooltip-container>`,
    );

    const host = page.locator('glide-core-private-tooltip-container');

    await expect(host).toHaveAttribute('role', 'tooltip');
  },
);

test(
  'has a role when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container
          disabled
        ></glide-core-private-tooltip-container>`,
    );

    const host = page.locator('glide-core-private-tooltip-container');

    await setProperty(host, 'disabled', false);

    await expect(host).toHaveAttribute('role', 'tooltip');
  },
);

test(
  'has no role when disabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container
          disabled
        ></glide-core-private-tooltip-container>`,
    );

    const host = page.locator('glide-core-private-tooltip-container');

    await expect(host).toHaveAttribute('role', 'none');
  },
);

test(
  'has no role when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-private-tooltip-container></glide-core-private-tooltip-container>`,
    );

    const host = page.locator('glide-core-private-tooltip-container');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveAttribute('role', 'none');
  },
);
