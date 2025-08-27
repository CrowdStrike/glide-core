import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can be removed via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
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
      () => button.press('Enter'),
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
  'can be removed via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
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
      () => button.press('Space'),
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
  'can be edited via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => button.press('Enter'),
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
  'can be edited via Space when editable',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tag label="Label" private-editable></glide-core-tag>`,
    );

    const host = page.locator('glide-core-tag');
    const button = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => button.press('Space'),
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
  'cannot be removed via Enter when disabled',
  { tag: '@keyboard' },
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
      () => button.press('Enter'),
      [{ type: 'remove' }],
    );

    await expect(host).toBeVisible();
  },
);

test(
  'cannot be removed via Space when disabled',
  { tag: '@keyboard' },
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
      () => button.press('Space'),
      [{ type: 'remove' }],
    );

    await expect(host).toBeVisible();
  },
);
