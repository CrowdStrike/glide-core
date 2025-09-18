import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover-container>
        Content
      </glide-core-popover-container>`,
  );

  const host = page.locator('glide-core-popover-container');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-popover-container',
  );
});

test(
  'gives itself an ID',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover-container>
          Content
        </glide-core-popover-container>`,
    );

    const host = page.locator('glide-core-popover-container');

    await expect(host).toHaveAttribute('id');
  },
);

test(
  'dispatches a "private-role-change" event when its role is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-popover-container>
          Content
        </glide-core-popover-container>`,
    );

    const host = page.locator('glide-core-popover-container');

    await expect(host).toDispatchEvents(
      () => setProperty(host, 'role', 'dialog'),
      [{ type: 'private-role-change', bubbles: true }],
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-popover-container>
          Content
        </glide-core-popover-container>`,
    );

    const host = page.locator('glide-core-popover-container');

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
          html`<glide-core-popover-container></glide-core-popover-container>`,
      ),
    ).rejects.toThrow();
  },
);
