import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('can be clicked via mouse', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-icon-button label="Label">
        <div>Icon</div>
      </glide-core-icon-button>`,
  );

  const host = page.locator('glide-core-icon-button');

  await expect(host).toDispatchEvents(
    () => host.click(),
    [
      {
        bubbles: true,
        cancelable: true,
        composed: true,
        type: 'click',
      },
    ],
  );
});

test(
  'can be clicked via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-icon-button label="Label">
          <div>Icon</div>
        </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'click'),
      [
        {
          bubbles: true,
          cancelable: true,
          composed: true,
          type: 'click',
        },
      ],
    );
  },
);

test(
  'cannot be clicked via mouse when disabled',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-icon-button label="Label" disabled>
          <div>Icon</div>
        </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).not.toDispatchEvents(
      () => host.click(),
      [{ type: 'click' }],
    );
  },
);

test(
  'cannot be clicked via `click()` when disabled',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-icon-button label="Label" disabled>
          <div>Icon</div>
        </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).not.toDispatchEvents(
      () => callMethod(host, 'click'),
      [{ type: 'click' }],
    );
  },
);
