import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'selects a button on click via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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

    await expect(buttons.nth(1)).toDispatchEvents(
      () => buttons.nth(1).click(),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
  },
);

test(
  'selects a button on click via `click()`',
  { tag: '@mouse' },
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

    await expect(buttons.nth(1)).toDispatchEvents(
      () => callMethod(buttons.nth(1), 'click'),
      [{ type: 'selected', bubbles: true }],
    );

    await expect(buttons.nth(1)).toHaveJSProperty('selected', true);
  },
);

test(
  'does not select a disabled button via click',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-button-group label="Label">
          <glide-core-button-group-button
            label="One"
          ></glide-core-button-group-button>

          <glide-core-button-group-button
            label="Two"
            disabled
          ></glide-core-button-group-button>
        </glide-core-button-group>`,
    );

    const buttons = page.locator('glide-core-button-group-button');

    await expect(buttons.nth(1)).not.toDispatchEvents(
      // eslint-disable-next-line playwright/no-force-option
      () => buttons.nth(1).click({ force: true }),
      [{ type: 'selected' }],
    );

    await expect(buttons.nth(0)).toHaveJSProperty('selected', true);
    await expect(buttons.nth(1)).toHaveJSProperty('selected', false);
  },
);

test(
  'does not dispatch a "selected" event when an already selected button is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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

    await expect(buttons.nth(1)).not.toDispatchEvents(
      () => buttons.nth(1).click(),
      [{ type: 'selected' }],
    );
  },
);
