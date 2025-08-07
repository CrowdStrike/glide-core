import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens on click via Enter',
  { tag: '@keyboard' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Enter');
    }, [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        defaultPrevented: false,
        type: 'toggle',
      },
    ]);

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'opens on click via Space',
  { tag: '@keyboard' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Space');
    }, [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        defaultPrevented: false,
        type: 'toggle',
      },
    ]);

    await expect(host).toHaveAttribute('open');
  },
);
