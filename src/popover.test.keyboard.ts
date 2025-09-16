import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('opens on Enter', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover>
        <div data-test="content">Content</div>
        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');
  const button = page.getByRole('button');
  const content = page.getByTestId('content');

  await expect(host).toDispatchEvents(
    () => button.press('Enter'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).toHaveAttribute('open');
  await expect(content).toBeVisible();
});

test('closes on Enter', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover open>
        <div data-test="content">Content</div>
        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');
  const button = page.getByRole('button');
  const content = page.getByTestId('content');

  await expect(host).toDispatchEvents(
    () => button.press('Enter'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).not.toHaveAttribute('open');
  await expect(content).toBeHidden();
});

test('opens on Space', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover>
        <div data-test="content">Content</div>
        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');
  const button = page.getByRole('button');
  const content = page.getByTestId('content');

  await expect(host).toDispatchEvents(
    () => button.press('Space'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).toHaveAttribute('open');
  await expect(content).toBeVisible();
});

test('closes on Space', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover open>
        <div data-test="content">Content</div>
        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');
  const button = page.getByRole('button');
  const content = page.getByTestId('content');

  await expect(host).toDispatchEvents(
    () => button.press('Space'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).not.toHaveAttribute('open');
  await expect(content).toBeHidden();
});

test('closes on Escape', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover open>
        <div data-test="content">Content</div>
        <button slot="target">Target</button>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');
  const button = page.getByRole('button');
  const content = page.getByTestId('content');

  await expect(host).toDispatchEvents(
    () => button.press('Escape'),
    [
      {
        type: 'toggle',
        bubbles: true,
        cancelable: false,
        composed: true,
      },
    ],
  );

  await expect(host).not.toHaveAttribute('open');
  await expect(content).toBeHidden();
});
