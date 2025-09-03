import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
  );

  const host = page.locator('glide-core-drawer');

  await expect(host).toBeDefined('glide-core-drawer');
});

test(
  'can be opened',
  { tag: '@miscellaneous' },
  async ({ browserName, mount, page, setProperty }) => {
    test.skip(
      browserName === 'webkit',
      '"toggle" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');
    const component = page.getByRole('complementary');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', true),
      [
        {
          bubbles: true,
          composed: true,
          type: 'toggle',
        },
      ],
    );

    await expect(component).toBeVisible();
  },
);

test(
  'can be closed',
  { tag: '@miscellaneous' },
  async ({ browserName, mount, page, setProperty }) => {
    test.skip(
      browserName === 'webkit',
      '"toggle" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');
    const component = page.getByRole('complementary');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', false),
      [
        {
          bubbles: true,
          composed: true,
          type: 'toggle',
        },
      ],
    );

    await expect(component).toBeHidden();
  },
);

test(
  'does not dispatch a "toggle" event when already open and opened programmatically',
  { tag: '@miscellaneous' },
  async ({ browserName, mount, page, setProperty }) => {
    test.skip(
      browserName === 'webkit',
      '"toggle" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () =>
        html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', true),
      [
        {
          bubbles: true,
          composed: true,
          type: 'toggle',
        },
      ],
    );
  },
);

test(
  'does not dispatch a "toggle" event when already closed and closed programmatically',
  { tag: '@miscellaneous' },
  async ({ browserName, mount, page, setProperty }) => {
    test.skip(
      browserName === 'webkit',
      '"toggle" is dispatched inconsistently in CI. Or perhaps on Ubuntu. Try removing this when Webkit 26 is stable (TODO).',
    );

    await mount(
      () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', false),
      [
        {
          bubbles: true,
          composed: true,
          type: 'toggle',
        },
      ],
    );
  },
);

test(
  'can be opened with reduced motion',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');
    const component = page.getByRole('complementary');

    await setProperty(host, 'open', true);
    await expect(component).toBeVisible();
  },
);

test(
  'can be closed with reduced motion',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<glide-core-drawer label="Label" open>Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');
    const component = page.getByRole('complementary');

    await setProperty(host, 'open', false);
    await expect(component).toBeHidden();
  },
);

test(
  'focuses itself when opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');

    await setProperty(host, 'open', true);

    await expect(page.getByRole('complementary')).toBeFocused();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-drawer>Content</glide-core-drawer>`),
    ).rejects.toThrow();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-drawer label="Label"></glide-core-drawer>`),
    ).rejects.toThrow();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-drawer label="Label">Content</glide-core-drawer>`,
    );

    const host = page.locator('glide-core-drawer');

    await expect(host).not.toBeExtensible();
  },
);
