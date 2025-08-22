import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can be removed via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-tag label="Label" removable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    const eventPromise = host.evaluate((element) => {
      return new Promise((resolve) => {
        element.addEventListener(
          'remove',
          (event) => {
            resolve({
              bubbles: event.bubbles,
              cancelable: event.cancelable,
              composed: event.composed,
              type: event.type,
            });
          },
          { once: true },
        );
      });
    });

    await button.focus();
    await button.press('Enter');

    const event = await eventPromise;

    expect(event).toEqual({
      bubbles: true,
      cancelable: false,
      composed: true,
      type: 'remove',
    });

    await expect(host).toBeHidden();
  },
);

test(
  'can be removed via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-tag label="Label" removable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    const eventPromise = host.evaluate((element) => {
      return new Promise((resolve) => {
        element.addEventListener(
          'remove',
          (event) => {
            resolve({
              bubbles: event.bubbles,
              cancelable: event.cancelable,
              composed: event.composed,
              type: event.type,
            });
          },
          { once: true },
        );
      });
    });

    await button.focus();
    await button.press('Space');

    const event = await eventPromise;

    expect(event).toEqual({
      bubbles: true,
      cancelable: false,
      composed: true,
      type: 'remove',
    });

    await expect(host).toBeHidden();
  },
);

test(
  'can edit via Enter when editable',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await button.focus();
      await button.press('Enter');
    }, [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        type: 'edit',
      },
    ]);
  },
);

test(
  'can edit via Space when editable',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await button.focus();
      await button.press('Space');
    }, [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        type: 'edit',
      },
    ]);
  },
);

test(
  'cannot be removed via Enter when disabled',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag
          label="Label"
          disabled
          removable
        ></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).not.toDispatchEvents(async () => {
      await button.focus();
      await button.press('Enter');
    }, [{ type: 'remove' }]);
  },
);

test(
  'cannot be removed via Space when disabled',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag
          label="Label"
          disabled
          removable
        ></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).not.toDispatchEvents(async () => {
      await button.focus();
      await button.press('Space');
    }, [{ type: 'remove' }]);
  },
);
