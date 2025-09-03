import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'opens when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');
    const listbox = page.getByRole('listbox');

    await target.click();

    await expect(host).toHaveAttribute('open');
    await expect(listbox).toBeVisible();
  },
);

test(
  'closes when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');
    const listbox = page.getByRole('listbox');

    await target.click();

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);
