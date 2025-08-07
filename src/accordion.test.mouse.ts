import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens on click via mouse when animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
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
  'opens on click via mouse when not animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
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
  'opens when clicked via `click()`',
  { tag: '@mouse' },
  async ({ browserName, callMethod, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
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
  'closes on click via mouse when animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
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
  'closes on click via mouse when not animated',
  { tag: '@mouse' },
  async ({ browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
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
  'closes when clicked via `click()`',
  { tag: '@mouse' },
  async ({ browserName, callMethod, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
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
