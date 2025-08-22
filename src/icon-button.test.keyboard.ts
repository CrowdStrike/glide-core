import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test(
  'can be clicked via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label">
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Enter');
    }, [
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        defaultPrevented: false,
        type: 'click',
      },
    ]);
  },
);

test(
  'can be clicked via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label">
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Space');
    }, [
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        defaultPrevented: false,
        type: 'click',
      },
    ]);
  },
);

test(
  'cannot be clicked via Enter when disabled',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label" disabled>
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).not.toDispatchEvents(
      () => host.press('Enter'),
      [{ type: 'click' }],
    );
  },
);

test(
  'cannot be clicked via Space when disabled',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label" disabled>
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).not.toDispatchEvents(
      () => host.press('Space'),
      [{ type: 'click' }],
    );
  },
);
