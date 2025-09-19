import { html } from 'lit';
import { expect, test } from './playwright/test.js';

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
  'sets `value` when an option is selected programmatically',
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
  'selects an option when `value` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
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

    const options = page.getByRole('option');

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
  },
);

test(
  'selects an option when `value` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
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
    const options = page.getByRole('option');

    await setProperty(host, 'value', ['one']);

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
  },
);

test(
  'deselects a selected option that is disabled initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option
              label="One"
              value="one"
              disabled
              selected
            ></glide-core-option>

            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(host).toHaveJSProperty('value', []);
  },
);

test(
  'deselects a selected option that is disabled programmatically',
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
  'deselects all but the last selected option when made single-select programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option
              label="One"
              value="one"
              selected
            ></glide-core-option>

            <glide-core-option
              label="Two"
              value="two"
              selected
            ></glide-core-option>

            <glide-core-option
              label="Three"
              value="three"
              selected
            ></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(host, 'multiple', false);

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(host).toHaveJSProperty('value', ['three']);
  },
);

test(
  'unsets `multiple` on its options when made single-select programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
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

    await setProperty(host, 'multiple', false);

    await expect(options.nth(0)).toHaveJSProperty('multiple', false);
    await expect(options.nth(1)).toHaveJSProperty('multiple', false);
  },
);

test(
  'updates its value when the value of a selected option is changed programmatically',
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

    await setProperty(options.nth(0), 'value', 'three');

    await expect(host).toHaveJSProperty('value', ['three']);
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
        () => html`
          <glide-core-select .value=${['one', 'two']}>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        `,
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
