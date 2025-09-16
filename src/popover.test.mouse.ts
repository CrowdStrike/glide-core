import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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
      () => button.click(),
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
  },
);

test(
  'closes when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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
      () => button.click(),
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
  },
);

test(
  'closes when clicked outside',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <div data-test="content">Content</div>
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const content = page.getByTestId('content');

    await expect(host).toDispatchEvents(
      () => page.mouse.click(0, 0),
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
  },
);

test(
  'remains open when its content is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <div data-test="content">Content</div>
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const content = page.getByTestId('content');

    await expect(host).not.toDispatchEvents(
      () => content.click(),
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
  },
);

test(
  'remains open when its arrow is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <div data-test="content">Content</div>
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const arrow = page.getByTestId('arrow');
    const content = page.getByTestId('content');

    await expect(host).not.toDispatchEvents(
      () => arrow.click(),
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
  },
);

test(
  'remains closed when disabled and its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover disabled>
          <div data-test="content">Content</div>
          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const content = page.getByTestId('content');

    await expect(host).not.toDispatchEvents(
      () => button.click(),
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
  },
);

test(
  'remains open when its target is clicked and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
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

    await addEventListener(button, 'click', { preventDefault: true });

    await expect(host).not.toDispatchEvents(
      () => button.click(),
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
  },
);

test(
  'remains closed when its target is clicked and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
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

    await addEventListener(button, 'click', { preventDefault: true });

    await expect(host).not.toDispatchEvents(
      () => button.click(),
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
  },
);

test(
  'does not close when the label of a slotted element is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <div data-test="content">
            <label for="input">Label</label>
            <input id="input" />
          </div>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const label = page.locator('label');
    const content = page.getByTestId('content');

    await expect(host).not.toDispatchEvents(
      () => label.click(),
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
  },
);
