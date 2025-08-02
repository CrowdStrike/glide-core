import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

// TODO: what do about other event tests. and what about focus tests?
// TODO: look over button to see what else isn't tested
// TODO: move these tests into keyboard and click

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
  'can be clicked via `click()`',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`<glide-core-button label="Label"></glide-core-button>`);

    const host = page.locator('glide-core-button');
    const eventsPromise = addEventListener(host, 'click');

    host.evaluate((node) => {
      if (node instanceof HTMLElement) {
        node.click();
      }
    });

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

    const events = await eventsPromise;

    expect(events).toHaveLength(0);
  },
);
