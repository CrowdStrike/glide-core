import { html } from 'lit';
import { expect, test } from './playwright/test.js';

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
  'supports slotted Option(s)',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(() => {
      return html`
        <select-with-slotted-options>
          <glide-core-option label="One"></glide-core-option>
          <glide-core-option label="Two"></glide-core-option>
        </select-with-slotted-options>
      `;
    });

    await page.addScriptTag({ type: 'module', url: '/src/select.ts' });
    await page.addScriptTag({ type: 'module', url: '/src/options.ts' });

    await page.evaluate(() => {
      customElements.define(
        'select-with-slotted-options',
        class extends HTMLElement {
          constructor() {
            super();

            const shadowRoot = this.attachShadow({ mode: 'open' });

            shadowRoot.innerHTML = `
              <glide-core-select open>
                <button slot="target">Target</button>

                <glide-core-options>
                  <slot></slot>
                </glide-core-options>
              </glide-core-select>
            `;
          }
        },
      );
    });

    const options = page.getByRole('option', { includeHidden: true });

    await options.nth(0).click();

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
  },
);
