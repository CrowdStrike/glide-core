import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'selects buttons via arrow keys',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
            disabled
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
            selected
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Three"
            disabled
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Four"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Five"
            disabled
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await page.keyboard.press('Tab');

    await expect(buttons.nth(3)).toDispatchEvents(
      () => page.keyboard.press('ArrowRight'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(3)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(3)).toBeFocused();

    await expect(buttons.nth(1)).toDispatchEvents(
      () => page.keyboard.press('ArrowDown'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(1)).toBeFocused();

    await expect(buttons.nth(3)).toDispatchEvents(
      () => page.keyboard.press('ArrowRight'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(3)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(3)).toBeFocused();

    await expect(buttons.nth(1)).toDispatchEvents(
      () => page.keyboard.press('ArrowLeft'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(1)).toBeFocused();

    await expect(buttons.nth(3)).toDispatchEvents(
      () => page.keyboard.press('ArrowUp'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(3)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(3)).toBeFocused();

    await expect(buttons.nth(1)).toDispatchEvents(
      () => page.keyboard.press('ArrowLeft'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(1)).toBeFocused();
  },
);

test(
  'selects buttons via Space',
  { tag: '@keyboard' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await callMethod(buttons.nth(1), 'focus');

    await expect(buttons.nth(1)).toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);

    await callMethod(buttons.nth(0), 'focus');

    await expect(buttons.nth(0)).toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(0)).toHaveJSProperty('selected', true);
  },
);

test(
  'does not dispatch a "selected" event when an already selected button is selected via Space',
  { tag: '@keyboard' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
            selected
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await callMethod(buttons.nth(1), 'focus');

    await expect(buttons.nth(1)).not.toDispatchEvents(
      () => page.keyboard.press('Space'),
      [{ type: 'selected' }],
    );
  },
);
