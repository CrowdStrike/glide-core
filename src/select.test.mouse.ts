import { html } from 'lit';
import { expect, test } from '@/src/playwright/test.js';

test(
  'opens when its target is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
      <glide-core-select>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

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
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');
    const listbox = page.getByRole('listbox');

    await target.click();

    await expect(host).not.toHaveAttribute('open');
    await expect(listbox).toBeHidden();
  },
);

test(
  'remains open when a disabled option is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One" disabled></glide-core-option>
          <glide-core-option label="Two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

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
  'can select an option via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One" value="one"></glide-core-option>
          <glide-core-option label="Two" value="two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');

    await expect(host).toDispatchEvents(
      () => page.getByRole('option').nth(0).click(),
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
  'can select an option via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One" value="one"></glide-core-option>
          <glide-core-option label="Two" value="two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');

    await expect(host).toDispatchEvents(async () => {
      const option = page.getByRole('option').nth(0);

      await callMethod(option, 'click');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
    ]);

    await expect(host).toHaveJSProperty('value', ['one']);
    await expect(host).not.toHaveAttribute('open');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);
  },
);

test(
  'can select a grouped option via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-options-group label="A">
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options-group>

          <glide-core-options-group label="B">
            <glide-core-option label="Three" value="three"></glide-core-option>
            <glide-core-option label="Four" value="four"></glide-core-option>
          </glide-core-options-group>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');

    await expect(host).toDispatchEvents(
      () => page.getByRole('option').nth(0).click(),
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
  'can select a grouped option via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-options-group label="A">
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options-group>

          <glide-core-options-group label="B">
            <glide-core-option label="Three" value="three"></glide-core-option>
            <glide-core-option label="Four" value="four"></glide-core-option>
          </glide-core-options-group>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');

    await expect(host).toDispatchEvents(async () => {
      const option = page.getByRole('option').nth(0);

      await callMethod(option, 'click');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
    ]);

    await expect(host).toHaveJSProperty('value', ['one']);
    await expect(host).not.toHaveAttribute('open');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);
  },
);

test(
  'deselects its selected option when another is selected via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
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

    await expect(host).toDispatchEvents(
      () => page.getByRole('option').nth(1).click(),
      [
        { bubbles: true, composed: true, type: 'input' },
        { bubbles: true, composed: true, type: 'change' },
      ],
    );

    await expect(host).toHaveJSProperty('value', ['two']);
    await expect(host).not.toHaveAttribute('open');

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', false);
  },
);

test(
  'retains its selected option when a sub-Menu option is selected via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => html`
      <glide-core-select open>
        <button slot="target">Target</button>

        <glide-core-options>
          <glide-core-option label="One" value="one" selected>
            <glide-core-menu slot="submenu" open>
              <span slot="target">☀</span>

              <glide-core-options>
                <glide-core-option label="Three"></glide-core-option>
                <glide-core-option label="Four"></glide-core-option>
              </glide-core-options>
            </glide-core-menu>
          </glide-core-option>

          <glide-core-option label="Two" value="two"></glide-core-option>
        </glide-core-options>
      </glide-core-select>
    `);

    const host = page.locator('glide-core-select');
    const menuitems = page.getByRole('menuitem');

    await menuitems.nth(0).click();

    await expect(host).toHaveJSProperty('value', ['one']);

    await expect(
      page.getByRole('option', { includeHidden: true }).nth(0),
    ).toHaveJSProperty('selected', true);
  },
);
