import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can be opened via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-accordion label="Label">
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.press('Enter'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'can be opened via Space',
  { tag: '@keyboard' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-accordion label="Label">
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.press('Space'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);
