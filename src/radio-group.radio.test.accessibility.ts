import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-radio-group-radio
        label="Label"
      ></glide-core-radio-group-radio>`,
  );

  await expect(page).toBeAccessible('glide-core-radio-group-radio');
});

test(
  'sets `aria-label` when `label` is set initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-label', 'Label');
  },
);

test(
  'sets `aria-label` when `label` is set programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="One"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'label', 'Two');

    await expect(host).toHaveAttribute('aria-label', 'Two');
  },
);

test(
  'sets `aria-checked` when checked initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          checked
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-checked', 'true');
  },
);

test(
  'sets `aria-checked` when checked programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'checked', true);

    await expect(host).toHaveAttribute('aria-checked', 'true');
  },
);

test(
  'sets `aria-checked` when unchecked initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-checked', 'false');
  },
);

test(
  'sets `aria-checked` when unchecked programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          checked
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'checked', false);

    await expect(host).toHaveAttribute('aria-checked', 'false');
  },
);

test(
  'sets `aria-disabled` when enabled initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-disabled', 'false');
  },
);

test(
  'sets `aria-disabled` when enabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          disabled
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

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
        html`<glide-core-radio-group-radio
          label="Label"
          disabled
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-disabled` when disabled programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveAttribute('aria-disabled', 'true');
  },
);

test(
  'sets `aria-invalid` when invalid initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          privateInvalid
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-invalid', 'true');
  },
);

test(
  'sets `aria-invalid` when made invalid programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'privateInvalid', true);

    await expect(host).toHaveAttribute('aria-invalid', 'true');
  },
);

test(
  'sets `aria-invalid` when valid initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-invalid', 'false');
  },
);

test(
  'sets `aria-invalid` when made valid programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          privateInvalid
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'privateInvalid', false);

    await expect(host).toHaveAttribute('aria-invalid', 'false');
  },
);

test(
  'sets `aria-required` when required initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          privateRequired
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-required', 'true');
  },
);

test(
  'sets `aria-required` when made required programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'privateRequired', true);

    await expect(host).toHaveAttribute('aria-required', 'true');
  },
);

test(
  'sets `aria-required` when not required initially',
  { tag: '@accessibility' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('aria-required', 'false');
  },
);

test(
  'sets `aria-required` when made not required programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group-radio
          label="Label"
          privateRequired
        ></glide-core-radio-group-radio>`,
    );

    const host = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'privateRequired', false);

    await expect(host).toHaveAttribute('aria-required', 'false');
  },
);
