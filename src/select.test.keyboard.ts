import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test(
  'opens when clicked via Space',
  { tag: '@keyboard' },
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

    await target.press('Space');

    await expect(host).toHaveAttribute('open');
    await expect(listbox).toBeVisible();
  },
);

test(
  'does not open when clicked via Enter',
  { tag: '@keyboard' },
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

    await target.press('Enter');

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

test(
  'can select an option via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => target.press('Space'),
      [
        { bubbles: true, composed: true, type: 'input' },
        { bubbles: true, composed: true, type: 'change' },
      ],
    );

    await expect(host).toHaveJSProperty('value', ['one']);
    await expect(host).not.toHaveAttribute('open');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);
  },
);

test(
  'can select an option via Enter',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => target.press('Enter'),
      [
        { bubbles: true, composed: true, type: 'input' },
        { bubbles: true, composed: true, type: 'change' },
      ],
    );

    await expect(host).toHaveJSProperty('value', ['one']);
    await expect(host).not.toHaveAttribute('open');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);
  },
);
