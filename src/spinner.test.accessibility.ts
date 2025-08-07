import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'is accessible',
  { tag: '@accessibility' },
  async ({ isAccessible, mount }) => {
    await mount(html`<glide-core-spinner label="Label"></glide-core-spinner>`);

    expect(await isAccessible('glide-core-spinner')).toStrictEqual([]);
  },
);

// Not sure what to name this test. It's not really testing `size="medium"`.
// It's testing the component in its default state because there aren't
// specific attributes that need to be tested.
test('size="medium"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=spinner--spinner');
  await page.locator('glide-core-spinner').waitFor();

  await expect(page.locator('glide-core-spinner')).toMatchAriaSnapshot(`
    - progressbar "Label"
  `);
});
