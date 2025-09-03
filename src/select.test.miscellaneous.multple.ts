import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'sets `multiple` on its options when `multiple` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One"></glide-core-option>
            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(host, 'multiple', true);

    await expect(options.nth(0)).toHaveJSProperty('multiple', true);
    await expect(options.nth(1)).toHaveJSProperty('multiple', true);
  },
);
