import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'checks checkboxes on click via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
          <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>

          <glide-core-checkbox
            label="Three"
            value="three"
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await expect(host).toDispatchEvents(async () => {
      await checkboxes.nth(1).click();
      await checkboxes.nth(0).click();
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(checkboxes.nth(0)).toHaveJSProperty('checked', true);
    await expect(checkboxes.nth(1)).toHaveJSProperty('checked', true);
    await expect(checkboxes.nth(2)).toHaveJSProperty('checked', false);
    await expect(host).toHaveJSProperty('value', ['two', 'one']);
  },
);

test(
  'checks checkboxes on click via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
          <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>

          <glide-core-checkbox
            label="Three"
            value="three"
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(checkboxes.nth(1), 'click');
      await callMethod(checkboxes.nth(0), 'click');
    }, [
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
      { type: 'input', bubbles: true, cancelable: false, composed: true },
      { type: 'change', bubbles: true, cancelable: false, composed: true },
    ]);

    await expect(checkboxes.nth(0)).toHaveJSProperty('checked', true);
    await expect(checkboxes.nth(1)).toHaveJSProperty('checked', true);
    await expect(checkboxes.nth(2)).toHaveJSProperty('checked', false);
    await expect(host).toHaveJSProperty('value', ['two', 'one']);
  },
);
