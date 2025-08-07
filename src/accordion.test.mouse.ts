import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens on click via mouse when animated',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');
    const eventsPromise = addEventListener(host, 'toggle');

    await host.click();
    await expect(host).toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'opens on click via mouse when not animated',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, mount, page }) => {
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
    const eventsPromise = addEventListener(host, 'toggle');

    await host.click();
    await expect(host).toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'opens when clicked programmatically',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, callMethod, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');
    const eventsPromise = addEventListener(host, 'toggle');

    await callMethod(host, 'click');
    await expect(host).toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'closes on click via mouse when animated',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, mount, page }) => {
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
    const eventsPromise = addEventListener(host, 'toggle');

    await host.click();
    await expect(host).not.toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'closes on click via mouse when not animated',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, mount, page }) => {
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
    const eventsPromise = addEventListener(host, 'toggle');

    await host.click();
    await expect(host).not.toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'closes when clicked programmatically',
  { tag: '@mouse' },
  async ({ addEventListener, browserName, callMethod, mount, page }) => {
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
    const eventsPromise = addEventListener(host, 'toggle');

    await callMethod(host, 'click');
    await expect(host).not.toHaveAttribute('open');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(false);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);
