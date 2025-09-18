import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-popover-container');

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
    await expect(container).toBeVisible();
  },
);

test(
  'closes when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-popover-container');

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
    await expect(container).toBeHidden();
  },
);

test(
  'closes when clicked outside',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

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
    await expect(container).toBeHidden();
  },
);

test(
  'remains open when its content is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await expect(host).not.toDispatchEvents(
      () => container.click(),
      [
        {
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeVisible();
  },
);

test(
  'remains open when its arrow is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const arrow = page.getByTestId('arrow');
    const container = page.locator('glide-core-popover-container');

    await expect(host).not.toDispatchEvents(
      () => arrow.click(),
      [
        {
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeVisible();
  },
);

test(
  'remains closed when disabled and its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover disabled>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-popover-container');

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
    await expect(container).toBeHidden();
  },
);

test(
  'remains open when its target is clicked and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-popover-container');

    await addEventListener(button, 'click', { preventDefault: true });

    await expect(host).not.toDispatchEvents(
      () => button.click(),
      [
        {
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeVisible();
  },
);

test(
  'remains closed when its target is clicked and the event is canceled',
  { tag: '@mouse' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const button = page.getByRole('button');
    const container = page.locator('glide-core-popover-container');

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
    await expect(container).toBeHidden();
  },
);

test(
  'does not close when the label of a slotted element is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <glide-core-popover-container>
            <label for="input">Label</label>
            <input id="input" />
          </glide-core-popover-container>

          <button slot="target">Target</button>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const label = page.locator('label');
    const container = page.locator('glide-core-popover-container');

    await expect(host).not.toDispatchEvents(
      () => label.click(),
      [
        {
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeVisible();
  },
);
