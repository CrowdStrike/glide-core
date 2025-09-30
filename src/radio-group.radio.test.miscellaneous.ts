import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>`,
  );

  const host = page.locator('glide-core-radio-group-radio');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-radio-group-radio',
  );
});

test(
  'dispatches a "private-checked-change" event when checked programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'checked', true),
      [{ type: 'private-checked-change', bubbles: true }],
    );
  },
);

test(
  'dispatches a "private-value-change" event when its value is changed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          value="one"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'value', 'two'),
      [{ type: 'private-value-change', bubbles: true }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

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
          html`<glide-core-radio-group-radio></glide-core-radio-group-radio>`,
      ),
    ).rejects.toThrow();
  },
);
