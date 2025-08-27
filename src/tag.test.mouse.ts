import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('can be removed via mouse', { tag: '@mouse' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<div data-test="container">
        <glide-core-tag label="Label" removable></glide-core-tag>
      </div>`,
  );

  const div = page.locator('[data-test="container"]');
  const host = page.locator('glide-core-tag');
  const button = page.getByRole('button');

  await expect(div).toDispatchEvents(
    () => button.click(),
    [
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        type: 'remove',
      },
    ],
  );

  await expect(host).toBeHidden();
});

test(
  'can be removed via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-tag label="Label" removable></glide-core-tag>
        </div>`,
    );

    const div = page.locator('[data-test="container"]');
    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(div).toDispatchEvents(
      () => callMethod(button, 'click'),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          type: 'remove',
        },
      ],
    );

    await expect(host).toBeHidden();
  },
);

test(
  'can be edited when editable',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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
  },
);

test(
  'cannot be removed via mouse when disabled',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-tag label="Label" disabled removable></glide-core-tag>
        </div>`,
    );

    const div = page.locator('[data-test="container"]');
    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(div).not.toDispatchEvents(
      () => button.click({ force: true }),
      [{ type: 'remove' }],
    );

    await expect(host).toBeVisible();
  },
);

test(
  'cannot be removed via `click()` when disabled',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-tag label="Label" disabled removable></glide-core-tag>
        </div>`,
    );

    const div = page.locator('[data-test="container"]');
    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(div).not.toDispatchEvents(
      () => callMethod(button, 'click'),
      [{ type: 'remove' }],
    );

    await expect(host).toBeVisible();
  },
);
