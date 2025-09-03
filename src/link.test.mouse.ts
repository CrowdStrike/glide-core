import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'dispatches a "click" event on click',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
    );

    const host = page.locator('glide-core-link');

    await addEventListener(host, 'click', {
      preventDefault: true,
    });

    await expect(host).toDispatchEvents(
      () => host.click(),
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
  'does not dispatch a "click" event on click when disabled',
  { tag: '@mouse' },
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
      () => host.click(),
      [{ type: 'click' }],
    );
  },
);

test(
  'dispatches a "click" event on `click()`',
  { tag: '@mouse' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-link label="Label" href="/"></glide-core-link>`,
    );

    const host = page.locator('glide-core-link');

    await addEventListener(host, 'click', {
      preventDefault: true,
    });

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'click'),
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
  'does not dispatch a "click" event on `click()` when disabled',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
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
      () => callMethod(host, 'click'),
      [{ type: 'click' }],
    );
  },
);
