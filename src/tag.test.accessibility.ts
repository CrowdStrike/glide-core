import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Tag from './tag.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-tag label="Label"></glide-core-tag>`);

  await expect(page).toBeAccessible('glide-core-tag');
});

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page.locator('glide-core-tag').evaluate<void, Tag>((element) => {
    element.disabled = true;
    element.removable = true;
  });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label" [disabled]'
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=tag--tag');

  await page.locator('glide-core-tag').evaluate<void, Tag>((element) => {
    element.removable = true;
  });

  await expect(page.locator('glide-core-tag')).toMatchAriaSnapshot(`
    - text: Label
    - 'button "Remove tag: Label"'
  `);
});
