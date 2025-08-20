import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can be checked via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-checkbox label="Label"></glide-core-checkbox>`,
    );

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(
      () => checkbox.press('Space'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'input',
        },
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'change',
        },
      ],
    );

    await expect(host).toHaveJSProperty('checked', true);
  },
);

test(
  'can be unchecked via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-checkbox label="Label" checked></glide-core-checkbox>`,
    );

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(
      () => checkbox.press('Space'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'input',
        },
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'change',
        },
      ],
    );

    await expect(host).toHaveJSProperty('checked', false);
  },
);
