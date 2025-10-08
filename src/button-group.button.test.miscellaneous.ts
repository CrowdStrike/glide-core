import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <glide-core-button-group-button
        label="Label"
      ></glide-core-button-group-button>
    `,
  );

  const host = page.locator('glide-core-button-group-button');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-button-group-button',
  );
});

test(
  'is tabbable when selected',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="One"
          selected
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveJSProperty('tabIndex', 0);
  },
);

test(
  'is not tabbable when not selected',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="One"
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'dispatches a "private-selected" event when selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="One"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'selected', true),
      [{ type: 'private-selected', bubbles: true }],
    );
  },
);

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="One"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');
    const radio = page.getByRole('radio');

    await callMethod(host, 'focus');

    await expect(radio).toBeFocused();
  },
);

test(
  'selects itself when `privateSelect()` is called',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="One"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'privateSelect'),
      [{ type: 'selected', bubbles: true, cancelable: false, composed: true }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-button-group-button></glide-core-button-group-button>
        `,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when `icon-only` and no "icon" slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-button-group-button
            label="Label"
            privateVariant="icon-only"
          ></glide-core-button-group-button>`,
      ),
    ).rejects.toThrow();
  },
);
