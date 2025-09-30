import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-split-button-primary-button
        label="Label"
      ></glide-core-split-button-primary-button>`,
  );

  await expect(page).toBeAccessible('glide-core-split-button-primary-button');
});
