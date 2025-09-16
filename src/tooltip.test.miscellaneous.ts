import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-tooltip label="Label">
        <button slot="target">Target</button>
      </glide-core-tooltip>`,
  );

  const host = page.locator('glide-core-tooltip');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-tooltip');
});

test(
  'can be open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const tooltip = page.getByTestId('tooltip');

    await expect(tooltip).toBeVisible();
  },
);

test(
  'can be opened programatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

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

    await expect(tooltip).toBeVisible();
  },
);

test(
  'can be closed initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const tooltip = page.getByTestId('tooltip');

    await expect(tooltip).toBeHidden();
  },
);

test(
  'can be closed programatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

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

    await expect(tooltip).toBeHidden();
  },
);

test(
  'remains open when opened programmatically and already open',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

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
    await expect(tooltip).toBeVisible();
  },
);

test(
  'remains closed when closed programmatically and already closed',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

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
    await expect(tooltip).toBeHidden();
  },
);

test(
  'is not open initially when disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open disabled>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const tooltip = page.getByTestId('tooltip');

    await expect(tooltip).toBeHidden();
  },
);

test(
  'cannot be opened programmatically when disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" disabled>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

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
    await expect(tooltip).toBeHidden();
  },
);

test(
  'opens when programmatically enabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" disabled open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

    await setProperty(host, 'disabled', false);

    await expect(host).toHaveAttribute('open');
    await expect(tooltip).toBeVisible();
  },
);

test(
  'closes when programmatically disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label" open>
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const tooltip = page.getByTestId('tooltip');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveAttribute('open');
    await expect(tooltip).toBeHidden();
  },
);

test(
  'passes certain properties to its container when they are set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip
          label="Label"
          description="Description"
          screenreader-hidden
          .shortcut=${['CMD', 'K']}
        >
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const container = page.locator('glide-core-private-tooltip-container');

    await expect(container).toHaveJSProperty('label', 'Label');
    await expect(container).toHaveJSProperty('description', 'Description');
    await expect(container).toHaveJSProperty('screenreaderHidden', true);
    await expect(container).toHaveJSProperty('shortcut', ['CMD', 'K']);
  },
);

test(
  'passes certain properties to its container when they are set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-tooltip
          label="One"
          description="Description"
          screenreader-hidden
          .shortcut=${['CMD', 'K']}
        >
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');
    const container = page.locator('glide-core-private-tooltip-container');

    await setProperty(host, 'label', 'Two');
    await setProperty(host, 'description', '');
    await setProperty(host, 'screenreaderHidden', false);
    await setProperty(host, 'shortcut', []);

    await expect(container).toHaveJSProperty('label', 'Two');
    await expect(container).toHaveJSProperty('description', '');
    await expect(container).toHaveJSProperty('screenreaderHidden', false);
    await expect(container).toHaveJSProperty('shortcut', []);
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-tooltip label="Label">
          <button slot="target">Target</button>
        </glide-core-tooltip>`,
    );

    const host = page.locator('glide-core-tooltip');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-tooltip>
            <button slot="target">Target</button>
          </glide-core-tooltip>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when it does not have a "target" slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`<glide-core-tooltip label="Label"></glide-core-tooltip>`,
      ),
    ).rejects.toThrow();
  },
);
