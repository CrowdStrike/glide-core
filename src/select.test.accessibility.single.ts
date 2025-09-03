import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('is accessible', { tag: '@accessibility' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-options-group label="A">
            <glide-core-option label="One" selected>
              <glide-core-menu slot="submenu">
                <span slot="target">☀</span>

                <glide-core-options>
                  <glide-core-option label="Five"></glide-core-option>
                  <glide-core-option label="Six"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>

            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options-group>

          <glide-core-options-group label="B">
            <glide-core-option label="Three"></glide-core-option>
            <glide-core-option label="Four"></glide-core-option>
          </glide-core-options-group>
        </glide-core-options>
      </glide-core-select>`,
  );

  await expect(page).toBeAccessible('glide-core-select', [
    // Menu has a similar test and it passes. The difference is that Select changes
    // the role of Options to "listbox" and the role of Option(s) to "option". This
    // test passes without whitelisting violations if you remove the sub-Menu.
    //
    // My suspicion, which I had while building Select, is that a "listbox" with a
    // nested "menu" isn't a strictly valid pattern. But what to do if a design calls
    // for a Menu-like thing that's a form control and has a sub-Menu?
    'aria-allowed-attr',
    'nested-interactive',
  ]);

  await mount(
    () =>
      html`<glide-core-select loading open>
        <button slot="target">Target</button>
        <glide-core-options></glide-core-options>
      </glide-core-select>`,
  );

  await expect(page).toBeAccessible('glide-core-select', ['aria-allowed-attr']);
});

test(
  'sets `aria-multiselectable` on its target when single-select initially',
  { tag: '@accessibility' },
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

    const target = page.getByRole('button');

    await expect(target).toHaveAttribute('aria-multiselectable', 'false');
  },
);

test(
  'set `aria-multiselectable` on its target when made single-select programmatically',
  { tag: '@accessibility' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await setProperty(host, 'multiple', false);

    await expect(target).toHaveAttribute('aria-multiselectable', 'false');
  },
);
