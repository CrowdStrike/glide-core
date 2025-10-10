import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-radio-group label="Label">
        <glide-core-radio-group-radio
          label="One"
        ></glide-core-radio-group-radio>

        <glide-core-radio-group-radio
          label="Two"
        ></glide-core-radio-group-radio>
      </glide-core-radio-group>`,
  );

  const host = page.locator('glide-core-radio-group');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-radio-group');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.getByRole('radio');

    await callMethod(host, 'focus');

    await expect(radios.nth(1)).toBeFocused();
  },
);

test(
  'passes certain properties to its radios when they are set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await expect(radios.nth(0)).toHaveJSProperty('disabled', true);
    await expect(radios.nth(1)).toHaveJSProperty('disabled', true);
  },
);

test(
  'sets its value when a radio is checked initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).toHaveJSProperty('value', 'one');
  },
);

test(
  'checks its radio when its value is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" value="one">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'checked', true);
    await setProperty(radios.nth(1), 'checked', false);
  },
);

test(
  'sets its value when a radio is checked programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'checked', true);

    await expect(host).toHaveJSProperty('value', 'one');
  },
);

test(
  'makes its first radio tabbable when none are checked',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', 0);
  },
);

test(
  'enables and makes a radio tabbable when value is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" value="one">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            disabled
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await expect(radios.nth(0)).not.toHaveAttribute('disabled');
    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', 0);
    await expect(radios.nth(1)).toHaveAttribute('disabled');
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'enables and makes a radio tabbable when value is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            disabled
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'value', 'one');

    await expect(radios.nth(0)).not.toHaveAttribute('disabled');
    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', 0);
    await expect(radios.nth(1)).toHaveAttribute('disabled');
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'disables radios when disabled initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveAttribute('disabled');
    await expect(radios.nth(1)).toHaveAttribute('disabled');
  },
);

test(
  'disables radios when disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveAttribute('disabled');
    await expect(radios.nth(1)).toHaveAttribute('disabled');
  },
);

test(
  'makes radios untabbable when disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', true);

    await expect(host).toHaveJSProperty('value', '');
    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', -1);
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'enables radios when enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', false);

    await expect(host).toHaveJSProperty('value', 'one');
    await expect(radios.nth(0)).not.toHaveAttribute('disabled');
    await expect(radios.nth(1)).not.toHaveAttribute('disabled');
  },
);

test(
  'makes its first radio tabbable when enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', false);

    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', 0);
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'makes its checked radio tabbable when enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            checked
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(host, 'disabled', false);

    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', -1);
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', 0);
  },
);

test(
  'makes its next radio tabbable when its checked radio is disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Three"
            value="three"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'disabled', true);

    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', -1);
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', 0);
    await expect(radios.nth(2)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'makes its first radio tabbable when its checked radio is the last radio and is disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Three"
            value="three"
            checked
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(2), 'disabled', true);

    await expect(radios.nth(0)).toHaveJSProperty('tabIndex', 0);
    await expect(radios.nth(1)).toHaveJSProperty('tabIndex', -1);
    await expect(radios.nth(2)).toHaveJSProperty('tabIndex', -1);
  },
);

test(
  'gives precedence to a checked radio over its initial value',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" value="one">
          <glide-core-radio-group-radio
            label="One"
            value="one"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
            checked
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await expect(host).toHaveAttribute('value', 'two');
    await expect(host).toHaveJSProperty('value', 'two');
    await expect(radios.nth(0)).toHaveJSProperty('checked', false);
    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
  },
);

test(
  'has an empty value when disabled',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label" disabled>
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).toHaveJSProperty('value', '');
  },
);

test(
  'has an empty value when a disabled radio is checked initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).toHaveJSProperty('value', '');
  },
);

test(
  'has an empty value when a checked radio is disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'disabled', true);

    await expect(host).toHaveJSProperty('value', '');
  },
);

test(
  'updates its value when the value of its checked radio is changed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'value', 'three');

    await expect(host).toHaveJSProperty('value', 'three');
  },
);

test(
  'updates its value when its checked radio is enabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
            value="one"
            checked
            disabled
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
            value="two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');
    const radios = page.locator('glide-core-radio-group-radio');

    await setProperty(radios.nth(0), 'disabled', false);

    await expect(host).toHaveJSProperty('value', 'one');
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>`,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when more than one radio is checked initially',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-radio-group label="Label">
            <glide-core-radio-group-radio
              label="One"
              checked
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        `,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-radio-group>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>`,
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
          html`<glide-core-radio-group label="Label">
            <input type="radio" />

            <glide-core-radio-group-radio
              label="Label"
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>`,
      ),
    ).rejects.toThrow();
  },
);
