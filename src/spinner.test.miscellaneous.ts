import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(() => html`<glide-core-spinner label="Label"></glide-core-spinner>`);

    const host = page.locator('glide-core-spinner');

    await expect(host).not.toBeExtensible();
  },
);
