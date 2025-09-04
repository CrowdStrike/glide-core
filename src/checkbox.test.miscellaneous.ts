import { html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
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
  'has a tooltip when "minimal" and with a long label',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox
          style=${styleMap({
            display: 'block',
            maxWidth: '6.25rem',
          })}
          label=${'x'.repeat(100)}
          private-variant="minimal"
          private-show-label-tooltip
        ></glide-core-checkbox>`,
    );

    const tooltip = page.locator('[data-test="label-tooltip"]');

    await expect(tooltip).not.toHaveAttribute('disabled');
    await expect(tooltip).toHaveAttribute('open');

    await expect(tooltip).toHaveText('x'.repeat(100), {
      useInnerText: true,
    });
  },
);

test(
  'has no tooltip when "minimal" and with a short label',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox
          label="Label"
          private-variant="minimal"
          private-show-label-tooltip
        ></glide-core-checkbox>`,
    );

    const tooltip = page.locator('[data-test="label-tooltip"]');

    await expect(tooltip).toHaveAttribute('disabled');
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
