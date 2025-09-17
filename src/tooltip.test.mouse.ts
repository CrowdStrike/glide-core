import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens when its target is hovered',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await expect(host).toDispatchEvents(
      () => button.hover(),
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
  'closes when its target is hovered away from',
  { tag: '@mouse' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-open-delay', '0');
    await setAttribute(tooltip, 'data-close-delay', '0');
    await button.hover();

    await expect(host).toDispatchEvents(
      () => page.mouse.move(0, 0),
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

test(
  'remains open when its target is hovered away from and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-close-delay', '0');
    await button.hover();
    await addEventListener(host, 'mouseout', { preventDefault: true });

    await expect(host).not.toDispatchEvents(
      () => page.mouse.move(0, 0),
      [{ type: 'toggle' }],
    );

    await expect(host).toHaveAttribute('open');
    await expect(tooltip).toBeVisible();
  },
);

test(
  'remains closed when its target is hovered and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-open-delay', '0');
    await addEventListener(host, 'mouseover', { preventDefault: true });

    await expect(host).not.toDispatchEvents(
      () => button.hover(),
      [{ type: 'toggle' }],
    );

    await expect(host).not.toHaveAttribute('open');
    await expect(tooltip).toBeHidden();
  },
);

test(
  'remains closed when disabled and its target is hovered',
  { tag: '@mouse' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" disabled>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-close-delay', '0');

    await expect(host).not.toDispatchEvents(
      () => button.hover(),
      [{ type: 'toggle' }],
    );

    await expect(host).not.toHaveAttribute('open');
    await expect(tooltip).toBeHidden();
  },
);

test(
  'remains open when its target is hovered back to before the close delay',
  { tag: '@mouse' },
  async ({ browserName, mount, page, setAttribute }) => {
    test.skip(browserName === 'webkit', 'Flaky. Unclear why.');

    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-open-delay', '0');
    await setAttribute(tooltip, 'data-close-delay', '100');
    await button.hover();

    await expect(host).not.toDispatchEvents(async () => {
      await page.mouse.move(0, 0);
      await button.hover();

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(100);
    }, [{ type: 'toggle' }]);

    await expect(host).toHaveAttribute('open');
    await expect(tooltip).toBeVisible();
  },
);

test(
  'remains closed when its target is hovered away from before the open delay',
  { tag: '@mouse' },
  async ({ mount, page, setAttribute }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const button = page.getByRole('button');
    const tooltip = page.getByTestId('tooltip');

    await setAttribute(tooltip, 'data-open-delay', '100');
    await setAttribute(tooltip, 'data-close-delay', '0');

    await expect(host).not.toDispatchEvents(async () => {
      await button.hover();
      await page.mouse.move(0, 0);

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(100);
    }, [{ type: 'toggle' }]);

    await expect(host).not.toHaveAttribute('open');
    await expect(tooltip).toBeHidden();
  },
);
