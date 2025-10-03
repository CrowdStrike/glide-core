import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'checks radios when arrowing',
  { tag: '@keyboard' },
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

          <glide-core-radio-group-radio
            label="Three"
            value="three"
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Four"
            value="four"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await page.keyboard.press('Tab');

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowRight'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', false);

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowDown'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'four');
    await expect(radios.nth(3)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', true);

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowRight'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', false);

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowLeft'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'four');
    await expect(radios.nth(3)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', true);

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowUp'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(1)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', false);

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('ArrowLeft'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).toBeFocused();
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
    await expect(radios.nth(2)).toHaveJSProperty('checked', false);
    await expect(radios.nth(3)).toHaveJSProperty('checked', false);
  },
);

test(
  'checks radios on Space',
  { tag: '@keyboard' },
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

    await callMethod(radios.nth(0), 'focus');

    await expect(radios.nth(0)).toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'input', bubbles: true, cancelable: false, composed: true }],
    );

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).toHaveJSProperty('checked', true);

    await callMethod(radios.nth(1), 'focus');

    await expect(radios.nth(1)).toDispatchEvents(
      () => page.keyboard.press('Space'),
      [
        { type: 'input', bubbles: true, cancelable: false, composed: true },
        { type: 'change', bubbles: true, cancelable: false, composed: true },
      ],
    );

    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
  },
);

test(
  'does not check disabled radios on Space',
  { tag: '@keyboard' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            disabled
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await callMethod(radios.nth(0), 'focus');

    await expect(radios.nth(0)).not.toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'input' }, { type: 'change' }],
    );

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);

    await callMethod(radios.nth(1), 'focus');

    await expect(radios.nth(1)).not.toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'input' }, { type: 'change' }],
    );

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(1)).toHaveJSProperty('checked', false);
  },
);
