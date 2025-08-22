import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('can be removed via mouse', { tag: '@mouse' }, async ({ mount, page }) => {
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

  await button.click();

  const event = await eventPromise;

  expect(event).toEqual({
    bubbles: true,
    cancelable: false,
    composed: true,
    type: 'remove',
  });

  await expect(host).toBeHidden();
});

test(
  'can be removed via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
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

    await callMethod(button, 'click');

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

test('can edit when editable', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
  );

  const host = page.locator('glide-core-tag');
  const button = page.getByRole('button');

  await expect(host).toDispatchEvents(
    () => button.click(),
    [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        type: 'edit',
      },
    ],
  );
});

test(
  'cannot be removed via mouse when disabled',
  { tag: '@mouse' },
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

    await expect(host).not.toDispatchEvents(
      () => button.click({ force: true }),
      [{ type: 'remove' }],
    );
  },
);

test(
  'cannot be removed via `click()` when disabled',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
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

    await expect(host).not.toDispatchEvents(
      () => callMethod(button, 'click'),
      [{ type: 'remove' }],
    );
  },
);
