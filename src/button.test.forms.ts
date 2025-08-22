import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test(
  'has a `form` property that returns its form',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');

    const hasForm = await host.evaluate((element) => {
      return 'form' in element && element.form instanceof HTMLFormElement;
    });

    expect(hasForm).toBe(true);
  },
);

test(
  'submits its form when clicked via mouse',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => host.click(),
      [
        {
          type: 'submit',
        },
      ],
    );
  },
);

test(
  'submits its form when clicked via Enter',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Enter');
    }, [
      {
        type: 'submit',
      },
    ]);
  },
);

test(
  'submits its form when clicked via Space',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(async () => {
      await host.focus();
      await host.press('Space');
    }, [
      {
        type: 'submit',
      },
    ]);
  },
);

test(
  'submits its form when clicked programmatically',
  { tag: '@forms' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => callMethod(host, 'click'),
      [
        {
          type: 'submit',
        },
      ],
    );
  },
);

test(
  'submits its form when `requestSubmit()` is called',
  { tag: '@forms' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(() => html`
      <form>
        <glide-core-button label="Label" type="submit"></glide-core-button>
      </form>
    `);

    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => callMethod(form, 'requestSubmit'),
      [
        {
          type: 'submit',
        },
      ],
    );
  },
);

test(
  'resets its form when clicked via mouse',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(() => html`
      <form>
        <input value="one" />
        <glide-core-button label="Label" type="reset"></glide-core-button>
      </form>
    `);

    const host = page.locator('glide-core-button');
    const input = page.locator('input');

    await input.fill('two');
    await host.click();
    await expect(input).toHaveJSProperty('value', 'one');
  },
);
