import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-modal label="Label">Content</glide-core-modal>`,
  );

  const host = page.locator('glide-core-modal');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-modal');
});

test(
  'can be open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
    );

    const dialog = page.getByRole('dialog');

    await expect(dialog).toBeVisible();
  },
);

test(
  'can be opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-modal label="Label">Content</glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const dialog = page.getByRole('dialog');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', true),
      [{ type: 'toggle', bubbles: true, composed: true }],
    );

    await expect(dialog).toBeVisible();
  },
);

test(
  'can be closed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const dialog = page.getByRole('dialog');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'open', false),
      [{ type: 'toggle', bubbles: true, composed: true }],
    );

    await expect(dialog).toBeHidden();
  },
);

test(
  'remains open when opened programmatically and already open',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const dialog = page.getByRole('dialog');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', true),
      [{ type: 'toggle', bubbles: true, composed: true }],
    );

    await expect(dialog).toBeVisible();
  },
);

test(
  'remains closed when opened programmatically and already closed',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-modal label="Label">Content</glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');
    const dialog = page.getByRole('dialog');

    await expect(host).not.toDispatchEvents(
      () => setProperty(host, 'open', false),
      [{ type: 'toggle', bubbles: true, composed: true }],
    );

    await expect(dialog).toBeHidden();
  },
);

test(
  'has a severity icon instead of a back button when both are provided',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-modal
          label="Label"
          severity="informational"
          back-button
          open
        >
          Content
        </glide-core-modal>`,
    );

    const backButton = page.getByTestId('back-button');
    const severityIcon = page.getByTestId('severity');

    await expect(backButton).toBeHidden();
    await expect(severityIcon).toBeVisible();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-modal label="Label">Content</glide-core-modal>`,
    );

    const host = page.locator('glide-core-modal');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-modal></glide-core-modal>`),
    ).rejects.toThrow();
  },
);
