import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-popover-container>
        Content
      </glide-core-popover-container>`,
  );

  await expect(page).toBeAccessible('glide-core-popover-container');
});
