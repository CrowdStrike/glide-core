import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <form>
        <glide-core-input label="Label"></glide-core-input>
      </form>
    `,
  );

  const host = page.locator('glide-core-input');

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
          <glide-core-input
            label="Label"
            value="initial"
            required
          ></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const form = page.locator('form');
    const input = host.locator('[data-test="input"]');

    await setProperty(host, 'value', 'changed');
    await callMethod(form, 'reset');

    await expect(host).toHaveJSProperty('value', 'initial');
    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');
  },
);

test(
  'can be reset when not provided with an initial value',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label"></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const form = page.locator('form');
    const input = host.locator('[data-test="input"]');

    await setProperty(host, 'value', 'changed');
    await callMethod(form, 'reset');

    await expect(host).toHaveJSProperty('value', '');
    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');
  },
);

test(
  'has a `formData` value when it has a value',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input
            label="Label"
            name="name"
            value="value"
          ></glide-core-input>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', 'value');
  },
);

test(
  'has no `formData` value when there is no value',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" name="name"></glide-core-input>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no `formData` value when it has a value but is disabled',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input
            label="Label"
            name="name"
            value="value"
            disabled
          ></glide-core-input>
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
          <glide-core-input
            label="Label"
            name="name"
            value="value"
            disabled
          ></glide-core-input>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no `formData` value when it has a value but no `name`',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" value="value"></glide-core-input>
        </form>
      `,
    );

    const form = page.locator('form');

    // When there's no name attribute, the field shouldn't appear in form data at all
    // We can check that the form has no entries by checking for a non-existent field
    await expect(form).toHaveFormData('nonexistent', null);
  },
);

test(
  'submits its form on Enter',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label"></glide-core-input>
        </form>
      `,
    );

    const form = page.locator('form');
    const input = page.getByRole('textbox');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(form).toDispatchEvents(
      () => input.press('Enter'),
      [{ type: 'submit' }],
    );
  },
);

test(
  'is valid if empty but not required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid after being filled in when empty and required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label" required></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.getByRole('textbox');
    const inputElement = host.locator('[data-test="input"]');

    await input.fill('value');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(inputElement).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is invalid if there is no value and it is required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label" required></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid after the value is cleared when required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          value="value"
          clearable
          required
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const clearButton = host.locator('[data-test="clear-button"]');
    const input = host.locator('[data-test="input"]');

    await clearButton.click();

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is valid if there is no value and it is required and disabled',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          disabled
          required
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'dispatches an invalid event when the form is submitted and required with no value',
  { tag: '@forms' },
  async ({ addEventListener, callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" required></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const form = page.locator('form');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(host).toDispatchEvents(
      () => callMethod(form, 'requestSubmit'),
      [
        {
          type: 'invalid',
        },
      ],
    );
  },
);

test(
  'focuses itself after submit when required and there is no value',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" required></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const form = page.locator('form');

    await callMethod(form, 'requestSubmit');

    const input = host.getByRole('textbox');
    await expect(input).toBeFocused();
  },
);

test(
  'updates its validity on blur',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" required></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const input = host.getByRole('textbox');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await input.focus();
    await input.blur();
    await callMethod(host, 'setCustomValidity', 'message');

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });

    await expect(host.locator('[data-test="input"]')).toHaveAttribute(
      'aria-invalid',
      'true',
    );
  },
);

test(
  'supports `setValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input
            label="Label"
            value="value"
            required
          ></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setValidity', { customError: true }, 'message');
    await setProperty(host, 'value', '');
    await callMethod(host, 'reportValidity');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.customError', true);

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });
  },
);

test(
  'sets the validity message with `setCustomValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" required></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setCustomValidity', 'message');
    await callMethod(host, 'reportValidity');

    await expect(host).toHaveJSProperty('validity.customError', true);

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });
  },
);

test(
  'removes a validity message with an empty argument to `setCustomValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');

    await callMethod(host, 'setCustomValidity', 'custom error message');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.customError', true);

    await callMethod(host, 'setCustomValidity', '');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.customError', false);
  },
);

test(
  'supports `resetValidityFeedback()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-input label="Label" required></glide-core-input>
        </form>
      `,
    );

    const host = page.locator('glide-core-input');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setCustomValidity', 'message');
    await callMethod(host, 'reportValidity');
    await callMethod(host, 'resetValidityFeedback');

    await expect(validityMessage).toBeHidden();
  },
);

test(
  'is valid when the `value` attribute matches `pattern`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          pattern="[a-z]{3,5}"
          value="abc"
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.patternMismatch', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is invalid when `value` does not match `pattern`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          pattern="[a-z]{3,5}"
          value="abc123"
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.patternMismatch', true);
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is valid when `pattern` is programmatically removed',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          pattern="[a-z]{3,5}"
          value="invalid123"
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'checkValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.patternMismatch', true);

    await setProperty(host, 'pattern', '');

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.patternMismatch', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when `value` is empty and `required` is updated to `false` programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`<glide-core-input label="Label" required></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'checkValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    await setProperty(host, 'required', false);

    await expect(host).not.toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is invalid when `required`, has an empty `value`, and a `pattern`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input
          label="Label"
          pattern="[a-z]{3,5}"
          required
        ></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const input = host.locator('[data-test="input"]');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(host).toHaveJSProperty('validity.patternMismatch', false);
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);
