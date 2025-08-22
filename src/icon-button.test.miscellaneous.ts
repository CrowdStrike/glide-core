import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-icon-button label="Label">
      <div>Icon</div>
    </glide-core-icon-button>`,
  );

  const host = page.locator('glide-core-icon-button');

  await expect(host).toBeRegistered('glide-core-icon-button');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label">
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await callMethod(host, 'focus');

    await expect(host).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-icon-button label="Label">
        <div>Icon</div>
      </glide-core-icon-button>`,
    );

    const host = page.locator('glide-core-icon-button');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`<glide-core-icon-button>
          <div>Icon</div>
        </glide-core-icon-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-icon-button></glide-core-icon-button>`),
    ).rejects.toThrow();
  },
);
