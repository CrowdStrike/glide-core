import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <form>
        <glide-core-radio-group label="Label">
          <glide-core-radio-group-radio
            label="One"
          ></glide-core-radio-group-radio>

          <glide-core-radio-group-radio
            label="Two"
          ></glide-core-radio-group-radio>
        </glide-core-radio-group>
      </form>
    `,
  );

  const host = page.locator('glide-core-radio-group');

  const hasForm = await host.evaluate((element) => {
    return 'form' in element && element.form instanceof HTMLFormElement;
  });

  expect(hasForm).toBe(true);
});

test(
  'can be reset',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" required>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const form = page.locator('form');
    const radios = page.getByRole('radio');

    await setProperty(radios.nth(1), 'checked', false);
    await callMethod(form, 'reset');

    await expect(radios.nth(1)).toHaveJSProperty('checked', true);
    await expect(host).toHaveJSProperty('validity.valid', true);
  },
);

test(
  'has form data when a radio is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" name="name">
            <glide-core-radio-group-radio
              label="One"
              value="one"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              value="two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', 'two');
  },
);

test(
  'has no form data when no radio is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" name="name">
            <glide-core-radio-group-radio
              label="One"
              value="one"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              value="two"
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when its checked radio is disabled',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" name="name">
            <glide-core-radio-group-radio
              label="One"
              value="one"
              disabled
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              value="two"
              checked
            ></glide-core-radio-group-radio>
            ></glide-core-radio-group
          >
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data it has no name and a radio is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" value="value">
            <glide-core-radio-group-radio
              label="One"
              value="one"
              checked
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              value="two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
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
          <glide-core-radio-group label="Label" name="name" disabled>
            <glide-core-radio-group-radio
              label="One"
              value="one"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              value="two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'is valid when required and a radio is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" required>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when not required and no radio is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label">
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when required and made not required programmatically and no radio is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page, removeAttribute }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" required>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
            ></glide-core-radio-group-radio
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');

    await removeAttribute(host, 'required');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is both valid and invalid when required but disabled and no radio is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" disabled required>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid on submit when required and a radio is checked',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label" required>
            <glide-core-radio-group-radio
              label="One"
            ></glide-core-radio-group-radio>

            <glide-core-radio-group-radio
              label="Two"
              checked
            ></glide-core-radio-group-radio>
          </glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const form = page.locator('form');
    const radios = page.getByRole('radio');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(host).not.toDispatchEvents(
      async () => radios.nth(1).press('Enter'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
  },
);

test(
  'is invalid when unchecked and required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid when required but unchecked via click',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            checked
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const checkbox = page.getByRole('checkbox');

    await checkbox.click();

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid on submit when required and unchecked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(
      () => checkbox.press('Enter'),
      [
        {
          type: 'invalid',
        },
      ],
    );

    await expect(checkbox).toBeFocused();
    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'true');
  },
);

test(
  'submits its form on Enter',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group label="Label"></glide-core-radio-group>
        </form>
      `,
    );

    const form = page.locator('form');
    const checkbox = page.getByRole('checkbox');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => checkbox.press('Enter'),
      [{ type: 'submit' }],
    );
  },
);

test(
  'updates its validity on blur',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const checkbox = page.getByRole('checkbox');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await checkbox.focus();
    await checkbox.blur();
    await callMethod(host, 'setCustomValidity', 'message');

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });

    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'true');
  },
);

test(
  'supports `setCustomValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await test.step('with message', async () => {
      await callMethod(host, 'setCustomValidity', 'message');
      await callMethod(host, 'reportValidity');

      await expect(host).toHaveJSProperty('validity.customError', true);

      await expect(validityMessage).toHaveText('message', {
        useInnerText: true,
      });
    });

    await test.step('without message', async () => {
      await callMethod(host, 'setCustomValidity', '');
      await callMethod(host, 'reportValidity');

      await expect(host).toHaveJSProperty('validity.customError', false);
      await expect(validityMessage).toBeHidden();
    });
  },
);

test(
  'supports `setValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            checked
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setValidity', { customError: true }, 'message');
    await setProperty(host, 'checked', false);
    await callMethod(host, 'reportValidity');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.customError', true);

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });
  },
);

test(
  'supports `resetValidityFeedback()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-radio-group
            label="Label"
            required
          ></glide-core-radio-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-radio-group');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setCustomValidity', 'message');
    await callMethod(host, 'reportValidity');
    await callMethod(host, 'resetValidityFeedback');

    await expect(validityMessage).toBeHidden();
  },
);
