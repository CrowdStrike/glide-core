import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-split-button-secondary-button label="Label">
        <glide-core-option label="Label"></glide-core-option>
      </glide-core-split-button-secondary-button>`,
  );

  const host = page.locator('glide-core-split-button-secondary-button');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-split-button-secondary-button',
  );
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-secondary-button label="Label">
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-split-button-secondary-button>`,
    );

    const host = page.locator('glide-core-split-button-secondary-button');
    const button = page.getByRole('button');

    await callMethod(host, 'focus');

    await expect(button).toBeFocused();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-secondary-button label="Label">
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-split-button-secondary-button>`,
    );

    const host = page.locator('glide-core-split-button-secondary-button');

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
          html`<glide-core-split-button-secondary-button>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-split-button-secondary-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button-secondary-button
            label="Label"
          ></glide-core-split-button-secondary-button>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when when its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-split-button-secondary-button label="Label">
            <option>Label</option>
          </glide-core-split-button-secondary-button>`,
      ),
    ).rejects.toThrow();
  },
);
