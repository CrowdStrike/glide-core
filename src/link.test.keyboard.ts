import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'dispatches a "click" event on Enter',
  { tag: '@keyboard' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
    );

    const host = page.locator('glide-core-link');

    await addEventListener(host, 'click', {
      preventDefault: true,
    });

    await expect(host).toDispatchEvents(
      () => host.press('Enter'),
      [
        {
          bubbles: true,
          composed: true,
          type: 'click',
        },
      ],
    );
  },
);

test(
  'does not dispatch a "click" event on Enter when disabled',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-link
          label="Label"
          href="/"
          disabled
        ></glide-core-link>`,
    );

    const host = page.locator('glide-core-link');

    await expect(host).not.toDispatchEvents(
      () => host.press('Enter'),
      [{ type: 'click' }],
    );
  },
);
