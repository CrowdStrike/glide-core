import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <form>
        <glide-core-select>
          <button slot="target">Target</button>
          <glide-core-options></glide-core-options>
        </glide-core-select>
      </form>
    `,
  );

  const host = page.locator('glide-core-select');

  const hasform = await host.evaluate((element) => {
    return 'form' in element && element.form instanceof HTMLFormElement;
  });

  expect(hasform).toBe(true);
});

test(
  'can be reset',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
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
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const form = page.locator('form');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'selected', false);
    await setProperty(options.nth(1), 'selected', true);
    await callMethod(form, 'reset');

    await expect(options.nth(0)).toHaveJSProperty('selected', true);
    await expect(options.nth(1)).toHaveJSProperty('selected', false);
    await expect(host).toHaveJSProperty('value', ['one']);
  },
);

test(
  'has form data when an option is selected',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select name="name">
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
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', JSON.stringify(['one']));
  },
);

test(
  'has no form data when no option is selected',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select name="name">
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when without a name',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" value="one"></glide-core-option>
              <glide-core-option label="Two" value="two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when disabled',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select name="name" disabled>
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
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'is valid when not required and no option is selected',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when required and no option is selected but made not required programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, removeAttribute }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await removeAttribute(host, 'required');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when required and an option is selected programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'selected', true);

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when required and `value` is set programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select required open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await setProperty(host, 'value', ['one']);

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is both valid and invalid when no option is selected and required but disabled',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select disabled required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid on submit when required and an option is selected',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select required>
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
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const form = page.locator('form');
    const target = page.getByRole('button');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(host).not.toDispatchEvents(
      async () => target.press('Enter'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(target).toHaveJSProperty('ariaInvalid', 'false');
  },
);

test(
  'is invalid when required and no option is selected',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(target).toHaveJSProperty('ariaInvalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid on submit when required and no option is selected',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await expect(host).toDispatchEvents(
      () => target.press('Enter'),
      [
        {
          type: 'invalid',
        },
      ],
    );

    await expect(target).toBeFocused();
    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(target).toHaveJSProperty('ariaInvalid', 'true');
  },
);

test(
  'is invalid when required and its selected option is disabled programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select open required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" selected></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');
    const options = page.getByRole('option');

    await setProperty(options.nth(0), 'disabled', true);

    await expect(host).toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }, { type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(target).toHaveJSProperty('ariaInvalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'submits its form on Enter when closed',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const form = page.locator('form');
    const target = page.getByRole('button');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => target.press('Enter'),
      [{ type: 'submit' }],
    );
  },
);

test(
  'does not submit its form on Enter when open',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select open>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One"></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const form = page.locator('form');
    const target = page.getByRole('button');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).not.toDispatchEvents(
      () => target.press('Enter'),
      [{ type: 'submit' }],
    );
  },
);

test(
  'supports `setValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-select open required>
            <button slot="target">Target</button>

            <glide-core-options>
              <glide-core-option label="One" selected></glide-core-option>
              <glide-core-option label="Two"></glide-core-option>
            </glide-core-options>
          </glide-core-select>
        </form>
      `,
    );

    const host = page.locator('glide-core-select');
    const target = page.getByRole('button');

    await callMethod(host, 'setValidity', { customError: true }, 'message');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }, { type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.customError', true);
    await expect(target).toHaveJSProperty('ariaInvalid', 'true');
  },
);
