import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
  );

  const host = page.locator('glide-core-accordion');

  await expect(host).toBeRegistered('glide-core-accordion');
});

test(
  'can be opened programatically',
  { tag: '@miscellaneous' },
  async ({ browserName, setProperty, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', true),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).toHaveAttribute('open');
  },
);

test(
  'can be closed programatically',
  { tag: '@miscellaneous' },
  async ({ browserName, setProperty, mount, page }) => {
    // eslint-disable-next-line playwright/no-skipped-test
    test.skip(
      browserName === 'webkit',
      '"finish" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      html`<glide-core-accordion label="Label" open>
        Content
      </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', false),
      [
        {
          bubbles: true,
          cancelable: false,
          composed: true,
          defaultPrevented: false,
          type: 'toggle',
        },
      ],
    );

    await expect(host).not.toHaveAttribute('open');
  },
);

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await callMethod(host, 'focus');
    await expect(host).toBeFocused();
  },
);

test(
  'does not dispatch a "toggle" event when already open and opened programmatically',
  { tag: '@miscellaneous' },
  async ({ setProperty, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label" open>
        Content
      </glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', true),
      [{ type: 'toggle' }],
    );
  },
);

test(
  'does not dispatch a "toggle" event when already closed and closed programmatically',
  { tag: '@miscellaneous' },
  async ({ setProperty, mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', false),
      [{ type: 'toggle' }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    const host = page.locator('glide-core-accordion');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`<glide-core-accordion>Content</glide-core-accordion>`),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`<glide-core-accordion label="Label"></glide-core-accordion>`),
    ).rejects.toThrow();
  },
);
