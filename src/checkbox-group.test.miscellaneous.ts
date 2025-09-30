import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-checkbox-group label="Label">
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-checkbox-group>`,
  );

  const host = page.locator('glide-core-checkbox-group');

  await expect(host).toBeInTheCustomElementRegistry(
    'glide-core-checkbox-group',
  );
});

test(
  'disables its checkboxes when disabled initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label" disabled>
          <glide-core-checkbox label="One"></glide-core-checkbox>
          <glide-core-checkbox label="Two"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const checkboxes = page.locator('glide-core-checkbox');

    await expect(checkboxes.nth(0)).toHaveAttribute('disabled');
    await expect(checkboxes.nth(1)).toHaveAttribute('disabled');
  },
);

test(
  'disables its checkboxes when disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One"></glide-core-checkbox>
          <glide-core-checkbox label="Two"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(host, 'disabled', true);

    await expect(checkboxes.nth(0)).toHaveAttribute('disabled');
    await expect(checkboxes.nth(1)).toHaveAttribute('disabled');
  },
);

test(
  'enables checkboxes when its value is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label" .value=${['one', 'two']}>
          <glide-core-checkbox
            label="One"
            value="one"
            disabled
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            disabled
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const checkboxes = page.locator('glide-core-checkbox');

    await expect(checkboxes.nth(0)).not.toHaveAttribute('disabled');
    await expect(checkboxes.nth(1)).not.toHaveAttribute('disabled');
  },
);

test(
  'adds the value of a programmatically enabled checkbox to its value',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            checked
            disabled
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Three"
            value="three"
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'disabled', false);

    await expect(host).toHaveJSProperty('value', ['two', 'one']);
  },
);

test(
  'removes the value of a programmatically disabled checkbox from its value',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Three"
            value="three"
            checked
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'disabled', true);

    await expect(host).toHaveJSProperty('value', ['two', 'three']);
  },
);

test(
  'enables checkboxes when its value is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            disabled
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            disabled
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(host, 'value', ['one', 'two']);

    await expect(checkboxes.nth(0)).not.toHaveAttribute('disabled');
    await expect(checkboxes.nth(1)).not.toHaveAttribute('disabled');
  },
);

test(
  'checks and unchecks checkboxes when its `value` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(host, 'value', ['two']);

    await expect(checkboxes.nth(0)).toHaveJSProperty('checked', false);
    await expect(checkboxes.nth(1)).toHaveJSProperty('checked', true);
  },
);

test(
  'updates its value when a checkbox is checked programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One" value="one"></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            checked
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'checked', true);

    await expect(host).toHaveJSProperty('value', ['two', 'one']);
  },
);

test(
  'updates its value when a checkbox is unchecked programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            checked
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'checked', false);

    await expect(host).toHaveJSProperty('value', ['two']);
  },
);

test(
  'updates its value when the value of a checkbox is changed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox
            label="One"
            value="one"
            checked
          ></glide-core-checkbox>

          <glide-core-checkbox
            label="Two"
            value="two"
            checked
          ></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'value', 'three');

    await expect(host).toHaveJSProperty('value', ['three', 'two']);
  },
);

test(
  'focuses the first enabled checkbox when `focus()` is called',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One"></glide-core-checkbox>
          <glide-core-checkbox label="Two"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await callMethod(host, 'focus');

    await expect(checkboxes.nth(0)).toBeFocused();
  },
);

test(
  'sets certain properties on its checkboxes initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One"></glide-core-checkbox>
          <glide-core-checkbox label="Two"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const checkboxes = page.locator('glide-core-checkbox');

    await expect(checkboxes.nth(0)).toHaveJSProperty(
      'privateVariant',
      'minimal',
    );

    await expect(checkboxes.nth(1)).toHaveJSProperty(
      'privateVariant',
      'minimal',
    );
  },
);

test(
  'sets certain properties on its checkboxes when new ones are added',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="One"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    await page.evaluate(() => {
      const checkbox = document.createElement('glide-core-checkbox');
      checkbox.label = 'Two';

      const host = document.querySelector('glide-core-checkbox-group');
      host?.append(checkbox);
    });

    await page.evaluate(() => {
      const checkbox = document.createElement('glide-core-checkbox');
      checkbox.label = 'Three';

      const host = document.querySelector('glide-core-checkbox-group');
      host?.append(checkbox);
    });

    const checkboxes = page.locator('glide-core-checkbox');

    await expect(checkboxes.nth(1)).toHaveJSProperty(
      'privateVariant',
      'minimal',
    );

    await expect(checkboxes.nth(2)).toHaveJSProperty(
      'privateVariant',
      'minimal',
    );
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-checkbox-group>`,
    );

    const host = page.locator('glide-core-checkbox-group');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-checkbox-group>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-checkbox-group label="Label">
            <input type="checkbox" />
          </glide-core-checkbox-group>`,
      ),
    ).rejects.toThrow();
  },
);
