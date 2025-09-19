import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'sets `value` when options are selected initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple>
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

            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');

    await expect(host).toHaveJSProperty('value', ['one', 'two']);
  },
);

test(
  'sets `value` when options are selected programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>

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

    await setProperty(options.nth(0), 'selected', true);
    await setProperty(options.nth(1), 'selected', true);

    await expect(host).toHaveJSProperty('value', ['three', 'one', 'two']);
  },
);

test(
  'sets `value` when options are deselected programmatically',
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

    await setProperty(options.nth(0), 'selected', false);
    await setProperty(options.nth(2), 'selected', false);

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'selects options when `value` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select .value=${['one', 'one', 'three']} multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const options = page.getByRole('option');

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(options.nth(3)).toHaveJSProperty('selected', true);
  },
);

test(
  'selects options when `value` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(host, 'value', ['one', 'one', 'three']);

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(options.nth(3)).toHaveJSProperty('selected', true);
  },
);

test(
  'deselects options when `value` is set programmatically',
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
              label="One"
              value="one"
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

    await setProperty(host, 'value', ['two', 'one']);

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', true);
    await expect(options.nth(2)).toHaveJSProperty('selected', false);
    await expect(options.nth(3)).toHaveJSProperty('selected', false);
  },
);

test(
  'deselects selected options that are disabled initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option
              label="One"
              value="one"
              disabled
              selected
            ></glide-core-option>

            <glide-core-option
              label="Two"
              value="two"
              disabled
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

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(host).toHaveJSProperty('value', ['three']);
  },
);

test(
  'deselects selected options that are disabled programmatically',
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

    await setProperty(options.nth(0), 'disabled', true);
    await setProperty(options.nth(1), 'disabled', true);

    await expect(options.nth(0)).toHaveJSProperty('selected', false);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(options.nth(2)).toHaveJSProperty('selected', true);
    await expect(host).toHaveJSProperty('value', ['three']);
  },
);

test(
  'sets `multiple` on its options when made multiselect programmatically',
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

test(
  'updates its value when the value of a selected option is changed programmatically',
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

            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'value', 'four');

    await expect(host).toHaveJSProperty('value', ['four', 'two']);
  },
);
