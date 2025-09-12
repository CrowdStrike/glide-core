import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'sets `aria-disabled` when enabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toHaveAttribute('aria-disabled', 'false');
  },
);

test(
  'sets `aria-disabled` when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'disabled', false);

    await expect(host).toHaveAttribute('aria-disabled', 'false');
  },
);

test(
  'sets `aria-disabled` when disabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-disabled` when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-selected` when `role="option"` and selected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          selected
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toHaveAttribute('aria-selected', 'true');
  },
);

test(
  'sets `aria-selected` when `role="option"` and selected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'selected', true);

    await expect(host).toHaveAttribute('aria-selected', 'true');
  },
);

test(
  'sets `aria-selected` when `role="option"` and unselected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toHaveAttribute('aria-selected', 'false');
  },
);

test(
  'sets `aria-selected` when `role="option"` and deselected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          selected
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'selected', false);

    await expect(host).toHaveAttribute('aria-selected', 'false');
  },
);

test(
  'sets `aria-selected` when `role="option"`, disabled, and selected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          disabled
          selected
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toHaveAttribute('aria-selected', 'false');
  },
);

test(
  'sets `aria-selected` when `role="option"`, disabled, and selected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          disabled
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'selected', true);

    await expect(host).toHaveAttribute('aria-selected', 'false');
  },
);

test(
  'does not set `aria-selected` when `role="menuitem"` and selected initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" selected></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toHaveAttribute('aria-selected');
  },
);

test(
  'does not set `aria-selected` when `role="menuitem"` and selected programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await setProperty(host, 'selected', true);

    await expect(host).not.toHaveAttribute('aria-selected');
  },
);
