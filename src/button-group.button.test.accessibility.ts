import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <glide-core-button-group-button
        label="Label"
      ></glide-core-button-group-button>
    `,
  );

  await expect(page).toBeAccessible('glide-core-button-group-button');
});

test(
  'sets `aria-checked` when selected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
          selected
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveAttribute('aria-checked', 'true');
  },
);

test(
  'sets `aria-checked` when selected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');
    const radio = page.getByRole('radio');

    await setProperty(host, 'selected', true);

    await expect(radio).toHaveAttribute('aria-checked', 'true');
  },
);

test(
  'sets `aria-checked` when unselected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveAttribute('aria-checked', 'false');
  },
);

test(
  'sets `aria-checked` when deselected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
          selected
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');
    const radio = page.getByRole('radio');

    await setProperty(host, 'selected', false);

    await expect(radio).toHaveAttribute('aria-checked', 'false');
  },
);

test(
  'sets `aria-disabled` when disabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
          disabled
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-disabled` when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');
    const radio = page.getByRole('radio');

    await setProperty(host, 'disabled', true);

    await expect(radio).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-disabled` when enabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
        ></glide-core-button-group-button>
      `,
    );

    const radio = page.getByRole('radio');

    await expect(radio).toHaveAttribute('aria-disabled', 'false');
  },
);

test(
  'sets `aria-disabled` when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-button-group-button
          label="Label"
          disabled
        ></glide-core-button-group-button>
      `,
    );

    const host = page.locator('glide-core-button-group-button');
    const radio = page.getByRole('radio');

    await setProperty(host, 'disabled', false);

    await expect(radio).toHaveAttribute('aria-disabled', 'false');
  },
);
