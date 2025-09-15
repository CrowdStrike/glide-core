import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-private-label tooltip="Tooltip">
        <label for="input">Label</label>
        <input id="input" slot="control" />
        <div slot="summary">Summary</div>
        <div slot="description">Description</div>
      </glide-core-private-label>`,
  );

  await expect(page).toBeAccessible('glide-core-private-label');
});
