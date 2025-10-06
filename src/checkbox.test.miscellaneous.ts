import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
  );

  const host = page.locator('glide-core-checkbox');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-checkbox');
});

test('can be disabled', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-checkbox label="Label" disabled></glide-core-checkbox>`,
  );

  const host = page.locator('glide-core-checkbox');

  await expect(host.waitFor).rejects.toThrow();
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    );

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await callMethod(host, 'focus');

    await expect(checkbox).toBeFocused();
  },
);

test(
  'dispatches a "private-value-change" event when `value` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox
          label="Label"
          value="one"
        ></glide-core-checkbox>`,
    );

    const host = page.locator('glide-core-checkbox');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'value', 'two'),
      [{ type: 'private-value-change' }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    );

    const host = page.locator('glide-core-checkbox');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-checkbox></glide-core-checkbox>`),
    ).rejects.toThrow();
  },
);
