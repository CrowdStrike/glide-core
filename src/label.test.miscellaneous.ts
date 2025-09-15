import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-private-label>
        <label>Label</label>
        <input slot="control" />
      </glide-core-private-label>`,
  );

  const host = page.locator('glide-core-private-label');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-private-label');
});

test(
  'has an asterisk when required',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label required>
          <label>Label</label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const asterisk = page.getByTestId('asterisk');

    await expect(asterisk).toBeVisible();
  },
);

test(
  'places its optional tooltip on the bottom when horizontal',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label tooltip="Tooltip">
          <label>Label</label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const tooltip = page.getByTestId('optional-tooltip');

    await expect(tooltip).toHaveAttribute('placement', 'bottom');
  },
);

test(
  'places its optional tooltip on the right when vertical',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label orientation="vertical" tooltip="Tooltip">
          <label>Label</label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const tooltip = page.getByTestId('optional-tooltip');

    await expect(tooltip).toHaveAttribute('placement', 'right');
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label>
          <label>Label</label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const host = page.locator('glide-core-private-label');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-private-label
            ><input slot="control"
          /></glide-core-private-label>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when it does not have a "control" slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-private-label>
            <label>Label</label>
          </glide-core-private-label>`,
      ),
    ).rejects.toThrow();
  },
);
