import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

test(
  'has a `form` property that returns its form',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-button label="Label"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');

    const hasForm = await host.evaluate((node) => {
      return 'form' in node && node.form instanceof HTMLFormElement;
    });

    expect(hasForm).toBe(true);
  },
);

test('resets its form on click', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(html`
    <form>
      <input value="one" />
      <glide-core-button label="Label" type="reset"></glide-core-button>
    </form>
  `);

  const host = page.locator('glide-core-button');
  const input = page.locator('input');

  await input.fill('two');
  host.click();

  await expect(input).toHaveJSProperty('value', 'one');
});

test(
  'submits its form on click',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`
      <form action="/">
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    const eventsPromise = addEventListener(form, 'submit', {
      preventDefault: true,
    });

    host.click();

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
  },
);

test(
  'submits its form when `requestSubmit()` is called',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`
      <form action="/">
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    const eventsPromise = addEventListener(form, 'submit', {
      preventDefault: true,
    });

    host.click();

    const events = await eventsPromise;

    expect(events).toHaveLength(1);
  },
);
