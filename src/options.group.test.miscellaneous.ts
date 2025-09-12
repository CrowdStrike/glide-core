import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-options-group label="Label">
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-options-group>`,
  );

  const host = page.locator('glide-core-options-group');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-options-group');
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-options-group label="Label">
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options-group>`,
    );

    const host = page.locator('glide-core-options-group');

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
          html`<glide-core-options-group>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options-group>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-options-group label="Label">
            <option>Label</option>
          </glide-core-options-group>`,
      ),
    ).rejects.toThrow();
  },
);
