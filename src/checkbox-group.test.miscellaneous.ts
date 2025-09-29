import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-checkbox-group label="Label">
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-checkbox-group>`,
  );

  const host = page.locator('glide-core-checkbox-group');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-checkbox-group',
  );
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');

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
          html`<glide-core-checkbox-group>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>`,
      ),
    ).rejects.toThrow();
  },
);
