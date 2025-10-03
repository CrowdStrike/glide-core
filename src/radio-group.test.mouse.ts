import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'checks radios on click via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).toDispatchEvents(
      () => radios.nth(0).click(),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(host).toDispatchEvents(
      () => radios.nth(1).click(),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        {
          type: 'change',
          bubbles: true,
          cancelable: false,
          composed: true,
        },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
  },
);

test(
  'checks radios on click via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).toDispatchEvents(
      () => callMethod(radios.nth(0), 'click'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(host).toDispatchEvents(
      () => callMethod(radios.nth(1), 'click'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        {
          type: 'change',
          bubbles: true,
          cancelable: false,
          composed: true,
        },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toBeFocused();
  },
);

test(
  'does not check radios on click when disabled',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).not.toDispatchEvents(
      () => radios.nth(0).click({ force: true }),
      [{ type: 'input' }, { type: 'change' }],
    );

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);

    await expect(host).not.toDispatchEvents(
      () => radios.nth(1).click({ force: true }),
      [{ type: 'input' }, { type: 'change' }],
    );

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
  },
);

test(
  'does not dispatch "input" and "change" events when an already selected radio is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).not.toDispatchEvents(
      () => radios.nth(0).click(),
      [{ type: 'input' }, { type: 'change' }],
    );
  },
);
