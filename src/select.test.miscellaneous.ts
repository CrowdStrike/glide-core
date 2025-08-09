import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(html`
    <glide-core-select>
      <button slot="target">Target</button>
      <glide-core-options></glide-core-options>
    </glide-core-select>
  `);

  const host = page.locator('glide-core-select');

  await expect(host).toBeRegistered('glide-core-select');
});

test(
  'sets `value` when an option is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(html`
      <glide-core-select>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One" value="one"></glide-core-option>

          <glide-core-option
            label="Two"
            value="two"
            selected
          ></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'is open when when open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

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
    await mount(html`
      <glide-core-select>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const listbox = page.getByRole('listbox');

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

test(
  'is open when opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(html`
      <glide-core-select>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

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
    await mount(html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const listbox = page.getByRole('listbox');

    await setProperty(host, 'open', false);

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

// TODO: think about this test name
test(
  'supports options being selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option
            label="One"
            value="one"
            selected
          ></glide-core-option>

          <glide-core-option label="Two" value="two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(1), 'selected', true);

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

// TODO: think about this test name
test(
  'supports options being disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option
            label="One"
            value="one"
            selected
          ></glide-core-option>

          <glide-core-option label="Two" value="two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'disabled', true);

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(host).toHaveJSProperty('value', []);
  },
);

test(
  'throws when more than one option is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`
        <glide-core-select>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" selected></glide-core-option>
            <glide-core-option label="Two" selected></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`
        <glide-core-select>
          <button slot="target">Target</button>
        </glide-core-select>
      `),
    ).rejects.toThrow();
  },
);

test(
  'throws when its "target" slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(html`
        <glide-core-select>
          <glide-core-options></glide-core-options>
        </glide-core-select>
      `),
    ).rejects.toThrow();
  },
);
