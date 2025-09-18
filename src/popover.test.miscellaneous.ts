import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover>
        <button slot="target">Target</button>
        <glide-core-popover-container> Content </glide-core-popover-container>
      </glide-core-popover>`,
  );

  const host = page.locator('glide-core-popover');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-popover');
});

test(
  'can be open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const container = page.locator('glide-core-popover-container');

    await expect(container).toBeVisible();
  },
);

test(
  'can be opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', true),
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
  'can be closed initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const container = page.locator('glide-core-popover-container');

    await expect(container).toBeHidden();
  },
);

test(
  'can be closed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
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
      () => setProperty(host, 'open', false),
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
  'remains open when opened programmatically and already open',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
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
      () => setProperty(host, 'open', true),
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
  'remains closed when opened programmatically and already closed',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', false),
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
  'is not opened initially when disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover disabled open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeHidden();
  },
);

test(
  'cannot be opened programmatically when disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover disabled>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', true),
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
    await expect(container).toBeHidden();
  },
);

test(
  'opens when enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover open disabled>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await setProperty(host, 'disabled', false);

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeVisible();
  },
);

test(
  'closes when disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover open>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');
    const container = page.locator('glide-core-popover-container');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveAttribute('open');
    await expect(container).toBeHidden();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover>
          <button slot="target">Target</button>
          <glide-core-popover-container> Content </glide-core-popover-container>
        </glide-core-popover>`,
    );

    const host = page.locator('glide-core-popover');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when it has no default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-popover
            ><button slot="target">Target</button></glide-core-popover
          >`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when it has no "target" slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-popover>
            <glide-core-popover-container>
              Content
            </glide-core-popover-container>
          </glide-core-popover>`,
      ),
    ).rejects.toThrow();
  },
);
