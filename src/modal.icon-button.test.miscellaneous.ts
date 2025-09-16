import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-modal-icon-button label="Label">
        Content
      </glide-core-modal-icon-button>`,
  );

  const host = page.locator('glide-core-modal-icon-button');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-modal-icon-button',
  );
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal-icon-button label="Label">
          Content
        </glide-core-modal-icon-button>`,
    );

    const host = page.locator('glide-core-modal-icon-button');

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
          html`<glide-core-modal-icon-button>
            Content
          </glide-core-modal-icon-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-modal-icon-button
            label="Label"
          ></glide-core-modal-icon-button>`,
      ),
    ).rejects.toThrow();
  },
);
