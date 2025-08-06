import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  const host = page.locator('glide-core-accordion');

  await expect(host).toBeRegistered('glide-core-accordion');
});

test(
  'opens when opened programatically',
  { tag: '@miscellaneous' },
  async ({ addEventListener, browserName, setProperty, mount, page }) => {
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

    await setProperty(host, 'open', true);
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
  'closes when closed programatically',
  { tag: '@miscellaneous' },
  async ({ addEventListener, browserName, setProperty, mount, page }) => {
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

    await setProperty(host, 'open', false);
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
  'receives focus when focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await callMethod(host, 'focus');
    await expect(host).toBeFocused();
  },
);

test(
  'does not dispatch a "toggle" event when already open and opened programmatically',
  { tag: '@miscellaneous' },
  async ({ addEventListener, setProperty, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label" open>
        Content
      </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');
    const eventsPromise = addEventListener(host, 'toggle');

    await setProperty(host, 'open', true);

    expect(await eventsPromise).toHaveLength(0);
  },
);

test(
  'does not dispatch a "toggle" event when already closed and closed programmatically',
  { tag: '@miscellaneous' },
  async ({ addEventListener, setProperty, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');
    const eventsPromise = addEventListener(host, 'toggle');

    await setProperty(host, 'open', false);

    expect(await eventsPromise).toHaveLength(0);
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`<glide-core-accordion>Content</glide-core-accordion>`),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`<glide-core-accordion label="Label"></glide-core-accordion>`),
    ).rejects.toThrow();
  },
);
