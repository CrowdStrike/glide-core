import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(html`
    <form>
      <glide-core-checkbox label="Label"></glide-core-checkbox>
    </form>
  `);

  const host = page.locator('glide-core-checkbox');

  const hasform = await host.evaluate((element) => {
    return 'form' in element && element.form instanceof HTMLFormElement;
  });

  expect(hasform).toBe(true);
});

test(
  'can be reset',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          checked
          indeterminate
        ></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const form = page.locator('form');

    await setProperty(host, 'checked', false);
    await setProperty(host, 'indeterminate', false);
    await callMethod(form, 'reset');

    await expect(host).toHaveJSProperty('checked', true);
    await expect(host).toHaveJSProperty('indeterminate', true);
  },
);

test(
  'has form data when checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          value="value"
          checked
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', 'value');
  },
);

test(
  'has form data when checked and indeterminate',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          value="value"
          checked
          indeterminate
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', 'value');
  },
);

test(
  'has no form data when unchecked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          value="value"
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when unchecked and indeterminate',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          value="value"
          indeterminate
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when checked and disabled',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          value="value"
          checked
          disabled
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when checked and without a name',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          value="value"
          checked
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when checked and without a value',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          name="name"
          checked
        ></glide-core-checkbox>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'is valid when unchecked but not required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" checked></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, []);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid when unchecked and required but made not required programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, removeAttribute }) => {
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await removeAttribute(host, 'required');

    await expect(host).toDispatchEvents(async () => {
      await callMethod(host, 'checkValidity');
      await callMethod(host, 'reportValidity');
    }, []);

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is both valid and invalid when unchecked and required but disabled',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          disabled
          required
        ></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'false');

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid on submit when required and checked',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          checked
          required
        ></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const form = page.locator('form');
    const checkbox = page.getByRole('checkbox');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(host).toDispatchEvents(
      async () => checkbox.press('Enter'),
      [],
    );

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
    await expect(checkbox).toHaveJSProperty('ariaInvalid', 'false');
  },
);

test(
  'is invalid when unchecked and required',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
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
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          checked
          required
        ></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
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
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
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
    await mount(html`
      <form>
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </form>
    `);

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
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
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
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
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
  async ({ callMethod, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-checkbox
          label="Label"
          checked
          required
        ></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setValidity', { customError: true }, 'message');
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
    await mount(html`
      <form>
        <glide-core-checkbox label="Label" required></glide-core-checkbox>
      </form>
    `);

    const host = page.locator('glide-core-checkbox');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setCustomValidity', 'message');
    await callMethod(host, 'reportValidity');
    await callMethod(host, 'resetValidityFeedback');

    await expect(validityMessage).toBeHidden();
  },
);
