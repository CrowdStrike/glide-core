import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'can select options via Space',
  { tag: '@keyboard' },
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
      await target.press('Space');
      await target.press('ArrowDown');
      await target.press('Space');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
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
  'can select options via Enter',
  { tag: '@keyboard' },
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
      await target.press('Enter');
      await target.press('ArrowDown');
      await target.press('Enter');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
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
  'can deselect options via Space',
  { tag: '@keyboard' },
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
      await target.press('Space');
      await target.press('ArrowDown');
      await target.press('Space');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
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
  'can deselect options via Enter',
  { tag: '@keyboard' },
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
      await target.press('Enter');
      await target.press('ArrowDown');
      await target.press('Enter');
    }, [
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
      { bubbles: true, composed: true, type: 'input' },
      { bubbles: true, composed: true, type: 'change' },
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
