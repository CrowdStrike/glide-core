import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

test(
  'can be clicked via mouse',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.click();

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(true);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'can be clicked programmatically',
  { tag: '@mouse' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await callMethod(host, 'click');

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
    expect(events.at(0)?.bubbles).toBe(true);
    expect(events.at(0)?.cancelable).toBe(true);
    expect(events.at(0)?.composed).toBe(true);
    expect(events.at(0)?.defaultPrevented).toBe(false);
  },
);

test(
  'cannot be clicked via mouse when disabled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      html`<glide-core-button label="Label" disabled></glide-core-button>`,
    );

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await host.click();

    expect(await eventsPromise).toHaveLength(0);
  },
);

test(
  'cannot be clicked programmatically when disabled',
  { tag: '@mouse' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(
      html`<glide-core-button label="Label" disabled></glide-core-button>`,
    );

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    await callMethod(host, 'click');

    expect(await eventsPromise).toHaveLength(0);
  },
);
