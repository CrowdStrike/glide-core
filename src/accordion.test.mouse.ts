import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can be opened via mouse when animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-accordion label="Label">
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.click(),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'can be opened via mouse when not animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<glide-core-accordion label="Label">
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.click(),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'can be opened via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    test.skip(
      ({ browserName }) => browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-accordion label="Label">
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'click'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'can be closed via mouse when animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-accordion label="Label" open>
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.click(),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'can be closed mouse when not animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<glide-core-accordion label="Label" open>
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => host.click(),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'can be closed via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    test.skip(
      ({ browserName }) => browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-accordion label="Label" open>
          Content
        </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'click'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).not.toHaveAttribute('open');
  },
);
