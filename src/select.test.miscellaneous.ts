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

  await expect(host).toBeDefined('glide-core-select');
});

test(
  'sets `value` when an option is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
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
      `,
    );

    const host = page.locator('glide-core-select');

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

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
  'selects an option when `value` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select .value=${['one']} open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(1), 'selected', true);

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'changes its initial `value` when an option is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select .value=${['one']} open>
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
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(1), 'selected', true);

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'changes its `value` when an option is selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
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
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(1), 'selected', true);

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'changes its `value` and selected option when its selected option is disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
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
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'disabled', true);

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(host).toHaveJSProperty('value', []);
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
  'throws when more than one option is selected initially',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-select>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" selected></glide-core-option>
              <glide-core-option label="Two" selected></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        `,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when `value` contains more than one value initially',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        (value) => html`
          <glide-core-select .value=${value}>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        `,
        ['one', 'two'],
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when `value` is set programmatically and has more then one value',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One"></glide-core-option>
            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');

    await expect(setProperty(host, 'value', ['one', 'two'])).rejects.toThrow();
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
