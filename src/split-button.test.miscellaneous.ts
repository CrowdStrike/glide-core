import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-split-button>
        <glide-core-split-button-primary-button
          label="Label"
        ></glide-core-split-button-primary-button>

        <glide-core-split-button-secondary-button
          label="Label"
          slot="secondary-button"
        >
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-split-button-secondary-button>
      </glide-core-split-button>`,
  );

  const host = page.locator('glide-core-split-button');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-split-button');
});

test(
  'passes certain properties to its buttons when they are set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button variant="secondary">
          <glide-core-split-button-primary-button
            label="Label"
          ></glide-core-split-button-primary-button>

          <glide-core-split-button-secondary-button
            label="Label"
            slot="secondary-button"
          >
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-split-button-secondary-button>
        </glide-core-split-button>`,
    );

    const primaryButton = page.locator(
      'glide-core-split-button-primary-button',
    );

    const secondaryButton = page.locator(
      'glide-core-split-button-secondary-button',
    );

    await expect(primaryButton).toHaveJSProperty('privateVariant', 'secondary');

    await expect(secondaryButton).toHaveJSProperty(
      'privateVariant',
      'secondary',
    );
  },
);

test(
  'passes certain properties to its buttons when they are set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-split-button>
          <glide-core-split-button-primary-button
            label="Label"
          ></glide-core-split-button-primary-button>

          <glide-core-split-button-secondary-button
            label="Label"
            slot="secondary-button"
          >
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-split-button-secondary-button>
        </glide-core-split-button>`,
    );

    const host = page.locator('glide-core-split-button');

    const primaryButton = page.locator(
      'glide-core-split-button-primary-button',
    );

    const secondaryButton = page.locator(
      'glide-core-split-button-secondary-button',
    );

    await setProperty(host, 'variant', 'secondary');

    await expect(primaryButton).toHaveJSProperty('privateVariant', 'secondary');

    await expect(secondaryButton).toHaveJSProperty(
      'privateVariant',
      'secondary',
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button>
          <glide-core-split-button-primary-button
            label="Label"
          ></glide-core-split-button-primary-button>

          <glide-core-split-button-secondary-button
            label="Label"
            slot="secondary-button"
          >
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-split-button-secondary-button>
        </glide-core-split-button>`,
    );

    const host = page.locator('glide-core-split-button');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button>
            <glide-core-split-button-secondary-button
              label="Label"
              slot="secondary-button"
            >
              <glide-core-option label="Label"></glide-core-option>
            </glide-core-split-button-secondary-button>
          </glide-core-split-button>`,
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
          html`<glide-core-split-button>
            <button>Label</button>

            <glide-core-split-button-secondary-button
              label="Label"
              slot="secondary-button"
            >
              <glide-core-option label="Label"></glide-core-option>
            </glide-core-split-button-secondary-button>
          </glide-core-split-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its "secondary" slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button>
            <glide-core-split-button-primary-button
              label="Label"
            ></glide-core-split-button-primary-button>
          </glide-core-split-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its "secondary" slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button>
            <glide-core-split-button-primary-button
              label="Label"
            ></glide-core-split-button-primary-button>

            <button slot="secondary-button">Label</button>
          </glide-core-split-button>`,
      ),
    ).rejects.toThrow();
  },
);
