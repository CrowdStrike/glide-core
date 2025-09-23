import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-button-group label="Label">
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      </glide-core-button-group>`,
  );

  const host = page.locator('glide-core-button-group');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-button-group');
});

test(
  'passes certain properties to its buttons when they are set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group
          label="Label"
          orientation="vertical"
          variant="icon-only"
        >
          <glide-core-button-group-button label="One">
            <div slot="icon">★</div>
          </glide-core-button-group-button>

          <glide-core-button-group-button label="Two">
            <div slot="icon">⚙</div>
          </glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await expect(buttons.nth(0)).toHaveJSProperty(
      'privateOrientation',
      'vertical',
    );

    await expect(buttons.nth(0)).toHaveJSProperty(
      'privateVariant',
      'icon-only',
    );

    await expect(buttons.nth(1)).toHaveJSProperty(
      'privateOrientation',
      'vertical',
    );

    await expect(buttons.nth(1)).toHaveJSProperty(
      'privateVariant',
      'icon-only',
    );
  },
);

test(
  'passes certain properties to its buttons when they are set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button label="One">
            <div slot="icon">★</div>
          </glide-core-button-group-button>

          <glide-core-button-group-button label="Two">
            <div slot="icon">⚙</div>
          </glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const host = page.locator('glide-core-button-group');
    const buttons = page.locator('glide-core-button-group-button');

    await setProperty(host, 'orientation', 'vertical');
    await setProperty(host, 'variant', 'icon-only');

    await expect(buttons.nth(0)).toHaveJSProperty(
      'privateOrientation',
      'vertical',
    );

    await expect(buttons.nth(0)).toHaveJSProperty(
      'privateVariant',
      'icon-only',
    );

    await expect(buttons.nth(1)).toHaveJSProperty(
      'privateOrientation',
      'vertical',
    );

    await expect(buttons.nth(1)).toHaveJSProperty(
      'privateVariant',
      'icon-only',
    );
  },
);

test(
  'selects initially the first enabled button',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
            disabled
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Three"
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await expect(buttons.nth(0)).toHaveJSProperty('selected', false);
    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(2)).toHaveJSProperty('selected', false);
  },
);

test(
  'deselects its selected button when another one is selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await setProperty(buttons.nth(1), 'selected', true);

    await expect(buttons.nth(0)).toHaveJSProperty('selected', false);
    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
  },
);

test(
  'selects no buttons initially when all are disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
            disabled
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
            disabled
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await expect(buttons.nth(0)).toHaveJSProperty('selected', false);
    await expect(buttons.nth(1)).toHaveJSProperty('selected', false);
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="Label"
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const host = page.locator('glide-core-button-group');

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
          html`<glide-core-button-group>
            <glide-core-button-group-button
              label="Label"
            ></glide-core-button-group-button>
          </glide-core-button-group>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-button-group label="Label">
            <button>Label</button>
          </glide-core-button-group>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when more than one button is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-button-group label="Label">
            <glide-core-button-group-button
              label="One"
              selected
            ></glide-core-button-group-button>

            <glide-core-button-group-button
              label="Two"
              selected
            ></glide-core-button-group-button>
          </glide-core-button-group>`,
      ),
    ).rejects.toThrow();
  },
);
