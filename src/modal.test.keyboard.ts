import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('closes on Escape', { tag: '@keyboard' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-modal label="Label" open>Content</glide-core-modal>`,
  );

  const host = page.locator('glide-core-modal');

  await page.keyboard.press('Escape');

  await expect(host).not.toHaveAttribute('open');
});
