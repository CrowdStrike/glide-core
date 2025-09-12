import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'dispatches a "change" event on blur',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.getByRole('textbox');

    await expect(host).toDispatchEvents(async () => {
      await input.fill('input');
      await input.blur();
    }, [
      {
        bubbles: true,
        composed: true,
        type: 'change',
      },
    ]);
  },
);

test(
  'dispatches an "input" event on input',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.getByRole('textbox');

    await expect(host).toDispatchEvents(
      () => input.press('KeyA'),
      [
        {
          bubbles: true,
          composed: true,
          type: 'input',
        },
      ],
    );
  },
);
