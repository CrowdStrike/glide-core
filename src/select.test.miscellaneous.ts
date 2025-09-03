import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <glide-core-select>
        <button slot="target">Target</button>
        <glide-core-options></glide-core-options>
      </glide-core-select>
    `,
  );

  const host = page.locator('glide-core-select');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-select');
});

test(
  'is opened when when open initially',
  { tag: '@miscellaneous' },
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
    const listbox = page.getByRole('listbox');

    await expect(host).toHaveAttribute('open');
    await expect(listbox).toBeVisible();
  },
);

test(
  'is closed when closed initially',
  { tag: '@miscellaneous' },
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
    const listbox = page.getByRole('listbox');

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

test(
  'is opened when opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
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
    const listbox = page.getByRole('listbox');

    await setProperty(host, 'open', true);

    await expect(host).toHaveAttribute('open');
    await expect(listbox).toBeVisible();
  },
);

test(
  'is closed when closed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
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
    const listbox = page.getByRole('listbox');

    await setProperty(host, 'open', false);

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
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

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-select>
            <button slot="target">Target</button>
          </glide-core-select>
        `,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its "target" slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-select>
            <glide-core-options></glide-core-options>
          </glide-core-select>
        `,
      ),
    ).rejects.toThrow();
  },
);
