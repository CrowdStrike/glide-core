import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

test(
  'can be clicked via Enter',
  { tag: '@keyboard' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.focus();
    await host.press('Enter');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(true);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'can be clicked via Space',
  { tag: '@keyboard' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.focus();
    await host.press('Space');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(true);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'cannot be clicked via Enter when disabled',
  { tag: '@keyboard' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      html`<glide-core-button label="Label" disabled></glide-core-button>`,
    );

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.focus();
    await host.press('Enter');

    expect(await eventsPromise).toHaveLength(0);
  },
);

test(
  'cannot be clicked via Space when disabled',
  { tag: '@keyboard' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      html`<glide-core-button label="Label" disabled></glide-core-button>`,
    );

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.focus();
    await host.press('Space');

    expect(await eventsPromise).toHaveLength(0);
  },
);
