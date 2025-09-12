import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-options></glide-core-options>`);

  const host = page.locator('glide-core-options');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-options');
});

test(
  'shows loading feedback',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(() => html`<glide-core-options></glide-core-options>`);

    const host = page.locator('glide-core-options');
    const feedback = page.getByTestId('loading-feedback');

    await setProperty(host, 'privateLoading', true);

    await expect(feedback).toBeVisible();
  },
);

test(
  'dispatches a "slotchange" event',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(() => html`<glide-core-options></glide-core-options>`);

    const host = page.locator('glide-core-options');

    await expect(host).toDispatchEvents(() => {
      return host.evaluate((element) => {
        const option = document.createElement('glide-core-option');

        option.label = 'Label';
        element.append(option);
      });
    }, [{ type: 'slotchange', bubbles: true }]);
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(() => html`<glide-core-options></glide-core-options>`);

    const host = page.locator('glide-core-options');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-options>
            <option>Label</option>
          </glide-core-options>`,
      ),
    ).rejects.toThrow();
  },
);
