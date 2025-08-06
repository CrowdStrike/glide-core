import { html } from 'lit';
import { expect, test } from './playwright/test.js';
import type Accordion from './accordion.js';

test(
  'is accessible',
  { tag: '@accessibility' },
  async ({ isAccessible, mount }) => {
    await mount(
      html`<glide-core-accordion label="Label">Content</glide-core-accordion>`,
    );

    expect(await isAccessible('glide-core-accordion')).toStrictEqual([]);
  },
);

test('open=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=accordion--accordion');

  await page
    .locator('glide-core-accordion')
    .evaluate<void, Accordion>((element) => {
      element.open = true;
    });

  await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot(`
    - group: Label Content
  `);
});

test('open=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=accordion--accordion');

  await expect(page.locator('glide-core-accordion')).toMatchAriaSnapshot(`
    - group: Label Content
  `);
});
