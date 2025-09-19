import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-option label="Label"></glide-core-option>`,
  );

  const host = page.locator('glide-core-option');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-option');
});

test(
  'is a link when `href` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" href="/"></glide-core-option>`,
    );

    const anchor = page.getByRole('link');

    await expect(anchor).toBeAttached();
  },
);

test(
  'is a link when `href` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const anchor = page.getByRole('link');

    await setProperty(host, 'href', '/');

    await expect(anchor).toBeAttached();
  },
);

test(
  'is not a link when `href` is not set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const anchor = page.getByRole('link');

    await expect(anchor).not.toBeAttached();
  },
);

test(
  'is a not a link when `href` is unset programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" href="/"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const anchor = page.getByRole('link');

    await setProperty(host, 'href', null);

    await expect(anchor).not.toBeAttached();
  },
);

test(
  'is not a link when `role="option"` and `href` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        /* eslint-disable lit-a11y/role-has-required-aria-attrs */
        html`<glide-core-option
          label="Label"
          href="/"
          role="option"
        ></glide-core-option>`,
    );

    const anchor = page.getByRole('link');

    await expect(anchor).not.toBeAttached();
  },
);

test(
  'is not a link when `role="option"` and `href` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        /* eslint-disable lit-a11y/role-has-required-aria-attrs */
        html`<glide-core-option
          label="Label"
          role="option"
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const anchor = page.getByRole('link');

    await setProperty(host, 'href', '/');

    await expect(anchor).not.toBeAttached();
  },
);

test(
  'can have a description',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option
          label="Label"
          description="Description"
        ></glide-core-option>`,
    );

    const description = page.getByTestId('description');

    await expect(description).toHaveText('Description', {
      useInnerText: true,
    });
  },
);

test(
  'has a checkbox when `multiple` and `role="option"`',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        /* eslint-disable lit-a11y/role-has-required-aria-attrs */
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
          selected
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await expect(checkbox).toBeVisible();
  },
);

test(
  'does not have a checkbox when `multiple` and not `role="option"`',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option
          label="Label"
          multiple
          selected
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await expect(checkbox).toBeHidden();
  },
);

test(
  'has a checkmark when `role="option"` and selected',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        /* eslint-disable lit-a11y/role-has-required-aria-attrs */
        html`<glide-core-option
          label="Label"
          role="option"
          selected
        ></glide-core-option>`,
    );

    const iconContainer = page.getByTestId('checked-icon-container');

    await expect(iconContainer).toBeVisible();
  },
);

test(
  'does not have a checkmark when `role="option"` and unselected',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
        ></glide-core-option>`,
    );

    const iconContainer = page.getByTestId('checked-icon-container');

    await expect(iconContainer).toBeHidden();
  },
);

test(
  'does not have a checkmark when `role="option"`, disabled, and selected',
  { tag: '@miscellaneous' },
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

    const iconContainer = page.getByTestId('checked-icon-container');

    await expect(iconContainer).toBeHidden();
  },
);

test(
  'does not have a checkmark when `role="menuitem"` and selected',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" selected></glide-core-option>`,
    );

    const iconContainer = page.getByTestId('checked-icon-container');

    await expect(iconContainer).toBeHidden();
  },
);

test(
  'falls back when it has no slotted content',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const contentSlot = page.getByTestId('content-slot');

    await expect(contentSlot).toBeVisible();
  },
);

test(
  'does not fall back when it has slotted content',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label">
          <div slot="content">Label</div>
        </glide-core-option>`,
    );

    const contentSlot = page.getByTestId('content-slot');

    await expect(contentSlot).toBeHidden();
  },
);

test(
  'enables its tooltip when overflowing and made active',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label=${'x'.repeat(500)}></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const tooltip = page.getByTestId('tooltip').first();

    await setProperty(host, 'privateActive', true);

    await expect(tooltip).not.toHaveAttribute('disabled');
  },
);

test(
  'enables its tooltip when its label is changed and overflows',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const tooltip = page.getByTestId('tooltip').first();

    await setProperty(host, 'label', 'x'.repeat(500));

    await expect(tooltip).not.toHaveAttribute('disabled');
  },
);

test(
  'disables its tooltip when its label is changed and no longer overflows',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label=${'x'.repeat(500)}></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const tooltip = page.getByTestId('tooltip').first();

    await setProperty(host, 'label', 'Label');

    await expect(tooltip).toHaveAttribute('disabled');
  },
);

test(
  'enables its tooltip when its description is changed and overflows',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option
          label="Label"
          description="Description"
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const tooltip = page.getByTestId('tooltip').first();

    await setProperty(host, 'description', 'x'.repeat(500));

    await expect(tooltip).not.toHaveAttribute('disabled');
  },
);

test(
  'disables its tooltip when its description is changed and no longer overflows',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option
          label="Label"
          description=${'x'.repeat(500)}
        ></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');
    const tooltip = page.getByTestId('tooltip').first();

    await setProperty(host, 'description', 'Description');

    await expect(tooltip).toHaveAttribute('disabled');
  },
);

test(
  'does not let its checkbox "click" event propagate',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
        ></glide-core-option>`,
    );

    const container = page.getByTestId('container');
    const checkbox = page.getByRole('checkbox');

    await expect(container).not.toDispatchEvents(
      () => checkbox.click(),
      [{ type: 'click' }],
    );
  },
);

test(
  'does not let its tooltip "toggle" event propagate',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label=${'x'.repeat(500)}></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => host.hover(),
      [{ type: 'toggle' }],
    );
  },
);

test(
  'dispatches an "enabled" event when enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'disabled', false),
      [{ type: 'enabled', bubbles: true }],
    );
  },
);

test(
  'does not dispatch an "enabled" event when enabled programmatically and already enabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'disabled', false),
      [{ type: 'enabled' }],
    );
  },
);

test(
  'dispatches a "disabled" event when disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'disabled', true),
      [{ type: 'disabled', bubbles: true }],
    );
  },
);

test(
  'does not dispatch a "disabled" event when disabled programmatically and already disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'disabled', true),
      [{ type: 'disabled' }],
    );
  },
);

test(
  'does not dispatch a "click" event when disabled and clicked via mouse',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      // eslint-disable-next-line playwright/no-force-option
      () => host.click({ force: true }),
      [{ type: 'click' }],
    );
  },
);

test(
  'does not dispatch a "click" event when disabled and clicked via `click()`',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" disabled></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => callMethod(host, 'click'),
      [{ type: 'click' }],
    );
  },
);

test(
  'dispatches a "selected" event when selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'selected', true),
      [{ type: 'selected', bubbles: true }],
    );
  },
);

test(
  'does not dispatch a "selected" event when selected programmatically and already selected',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" selected></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'selected', true),
      [{ type: 'selected' }],
    );
  },
);

test(
  'dispatches a "deselected" event when deselected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="Label" selected></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'selected', false),
      [{ type: 'deselected', bubbles: true }],
    );
  },
);

test(
  'does not dispatch a "deselected" event when deselected programmatically and already deselected',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'selected', false),
      [{ type: 'deselected' }],
    );
  },
);

test(
  'dispatches a "value-change" event when its value is changed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-option label="One" value="one"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'value', 'two'),
      [{ type: 'value-change', bubbles: true }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-option label="Label"></glide-core-option>`,
    );

    const host = page.locator('glide-core-option');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-option></glide-core-option>`),
    ).rejects.toThrow();
  },
);
