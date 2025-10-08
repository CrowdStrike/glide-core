import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'remains open when a disabled option is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" disabled></glide-core-option>
            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const listbox = page.getByRole('listbox');
    const options = page.getByRole('option');

    // eslint-disable-next-line playwright/no-force-option
    await options.first().click({ force: true });

    await expect(host).toHaveAttribute('open');
    await expect(listbox).toBeVisible();
  },
);

test(
  'can select options via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await page.getByRole('option').nth(0).click();
      await page.getByRole('option').nth(1).click();
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['one', 'two']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'One,Two');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(1)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      false,
    );
  },
);

test(
  'can select options via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
            <glide-core-option label="Three" value="three"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(options.nth(0), 'click');
      await callMethod(options.nth(1), 'click');
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['one', 'two']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'One,Two');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(1)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      false,
    );
  },
);

test(
  'can select grouped options via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-options-group label="A">
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options-group>

            <glide-core-options-group label="B">
              <glide-core-option
                label="Three"
                value="three"
              ></glide-core-option>

              <glide-core-option label="Four" value="four"></glide-core-option>
            </glide-core-options-group>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await options.nth(0).click();
      await options.nth(2).click();
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['one', 'three']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'One,Three');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      true,
    );
  },
);

test(
  'can select grouped options via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-options-group label="A">
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options-group>

            <glide-core-options-group label="B">
              <glide-core-option
                label="Three"
                value="three"
              ></glide-core-option>

              <glide-core-option label="Four" value="four"></glide-core-option>
            </glide-core-options-group>
          </glide-core-options>
        </glide-core-select>
      `,
    );

    const host = page.locator('glide-core-select');
    const options = page.getByRole('option');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(options.nth(0), 'click');
      await callMethod(options.nth(2), 'click');
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['one', 'three']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'One,Three');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      true,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      true,
    );
  },
);

test(
  'can deselect options via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
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
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await page.getByRole('option').nth(0).click();
      await page.getByRole('option').nth(1).click();
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['three']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'Three');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      false,
    );

    await expect(page.getByRole('option').nth(1)).toHaveJSProperty(
      'selected',
      false,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      true,
    );
  },
);

test(
  'can deselect options via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
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
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(options.nth(0), 'click');
      await callMethod(options.nth(1), 'click');
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(host).toHaveJSProperty('value', ['three']);
    await expect(host).toHaveAttribute('open');
    await expect(target).toHaveJSProperty('ariaDescription', 'Three');

    await expect(page.getByRole('option').nth(0)).toHaveJSProperty(
      'selected',
      false,
    );

    await expect(page.getByRole('option').nth(1)).toHaveJSProperty(
      'selected',
      false,
    );

    await expect(page.getByRole('option').nth(2)).toHaveJSProperty(
      'selected',
      true,
    );
  },
);

test(
  'retains its selected options when a sub-Menu option is selected via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-select multiple open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one" selected>
              <glide-core-menu slot="submenu" open>
                <span slot="target">☀</span>

                <glide-core-options>
                  <glide-core-option label="Four"></glide-core-option>
                  <glide-core-option label="Fix"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>

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
    const menuitems = page.getByRole('menuitem');
    const target = page.getByRole('button');

    await menuitems.nth(0).click();

    await expect(host).toHaveJSProperty('value', ['one', 'two']);
    await expect(target).toHaveJSProperty('ariaDescription', 'One,Two');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(1),
    ).toHaveJSProperty('selected', true);
  },
);
