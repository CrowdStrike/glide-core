import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens when its target is tabbed to',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('Tab'),
      [
        {
          type: 'toggle',
          bubbles: true,
          cancelable: false,
          composed: true,
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
    await expect(tooltip).toBeVisible();
  },
);

test(
  'closes when its target is tabbed away from',
  { tag: '@keyboard' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'firefox',
      `Tooltip doesn't close in CI when tabbed away from. So "toggle" is never dispatched.`,
    );

    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

    await page.keyboard.press('Tab');

    await expect(host).toDispatchEvents(
      () => page.keyboard.press('Tab'),
      [
        {
          type: 'toggle',
          bubbles: true,
          cancelable: false,
          composed: true,
        },
      ],
    );

    await expect(host).not.toHaveAttribute('open');
    await expect(tooltip).toBeHidden();
  },
);

test('closes on Escape', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-tooltip label="Label" open>
        <button slot="target">Target</button>
      </glide-core-tooltip>`,
  );

  const host = page.locator('glide-core-tooltip');
  const tooltip = page.getByTestId('tooltip');
  const button = page.getByRole('button');

  await expect(host).toDispatchEvents(
    () => button.press('Escape'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).not.toHaveAttribute('open');
  await expect(tooltip).toBeHidden();
});
