import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <form>
        <glide-core-checkbox-group label="Label">
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-checkbox-group>
      </form>
    `,
  );

  const host = page.locator('glide-core-checkbox-group');

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
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox
              label="One"
              checked
              value="one"
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const form = page.locator('form');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'checked', false);
    await setProperty(checkboxes.nth(1), 'checked', true);
    await callMethod(form, 'reset');

    await expect(checkboxes.nth(0)).toHaveJSProperty('checked', true);
    await expect(checkboxes.nth(1)).toHaveJSProperty('checked', false);
    await expect(host).toHaveJSProperty('value', ['one']);
    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
  },
);

test(
  'has form data when a checkbox is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name">
            <glide-core-checkbox
              label="One"
              value="one"
              checked
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', JSON.stringify(['one']));
  },
);

test(
  'has form data when all checkboxes are checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name">
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
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', JSON.stringify(['one', 'two']));
  },
);

test(
  'has form data when a checkbox is checked and indeterminate',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name">
            <glide-core-checkbox
              label="One"
              value="one"
              checked
              indeterminate
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', JSON.stringify(['one']));
  },
);

test(
  'has no form data when all checkboxes are unchecked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name">
            <glide-core-checkbox label="One" value="one"></glide-core-checkbox>
            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when a checkbox is checked and disabled',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name">
            <glide-core-checkbox
              label="One"
              value="one"
              checked
              disabled
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when it is disabled a checkbox is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" name="name" disabled>
            <glide-core-checkbox
              label="One"
              value="one"
              checked
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two" value="two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data it has no name and a checkbox is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox
              label="Label"
              value="value"
              checked
            ></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'is valid when required and a checkbox is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label" checked></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');

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
  'is valid when not required and no checkbox is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');

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
  'is valid when required and made not required programmatically and no checkbox is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page, removeAttribute }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');

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
  'is both valid and invalid when required but disabled and no checkbox is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" disabled required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    expect(await callMethod(host, 'checkValidity')).toBe(true);
    expect(await callMethod(host, 'reportValidity')).toBe(true);
  },
);

test(
  'is valid on submit when required and a checkbox is checked',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="One"></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const form = page.locator('form');
    const checkboxes = page.getByRole('checkbox');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    await expect(host).not.toDispatchEvents(
      async () => checkboxes.nth(0).press('Enter'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', true);
    await expect(host).toHaveJSProperty('validity.valueMissing', false);
  },
);

test(
  'is valid when a disabled and checked checkbox is enabled programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, removeAttribute }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox
              label="One"
              checked
              disabled
            ></glide-core-checkbox>

            <glide-core-checkbox label="Two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await removeAttribute(checkboxes.nth(0), 'disabled');

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
  'is invalid when an enabled and checked checkbox is disabled programmatically',
  { tag: '@forms' },
  async ({ callMethod, mount, page, setProperty }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="One" checked></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');

    await setProperty(checkboxes.nth(0), 'disabled', true);

    await expect(host).toDispatchEvents(async () => {
      await callMethod(host, 'reportValidity');
    }, [{ type: 'invalid' }]);

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid when required and no checkbox is checked',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid when required and its only checked checkbox is unchecked via click',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label" checked></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkbox = page.getByRole('checkbox');

    await checkbox.click();

    await expect(host).toDispatchEvents(
      () => callMethod(host, 'reportValidity'),
      [{ type: 'invalid' }],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);

    expect(await callMethod(host, 'checkValidity')).toBe(false);
    expect(await callMethod(host, 'reportValidity')).toBe(false);
  },
);

test(
  'is invalid on submit when required and no checkbox is checked',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkbox = page.getByRole('checkbox');

    await expect(host).toDispatchEvents(
      () => checkbox.press('Enter'),
      [
        {
          type: 'invalid',
        },
      ],
    );

    await expect(host).toHaveJSProperty('validity.valid', false);
    await expect(host).toHaveJSProperty('validity.valueMissing', true);
  },
);

test(
  'focuses its first checkbox on submit when invalid',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="One"></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
          </glide-core-checkbox-group>

          <button>Submit</button>
        </form>
      `,
    );

    const checkboxes = page.getByRole('checkbox');
    const button = page.getByRole('button');

    await button.press('Enter');

    await expect(checkboxes.nth(0)).toBeFocused();
  },
);

test(
  'does not focus its first checkbox on submit when invalid when another checkbox has focus',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="One"></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const checkboxes = page.getByRole('checkbox');

    await checkboxes.nth(1).press('Enter');

    await expect(checkboxes.nth(1)).toBeFocused();
  },
);

test(
  'submits its form on Enter',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label">
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
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
  'updates its validity when its last enabled checkbox is blurred',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="One"></glide-core-checkbox>
            <glide-core-checkbox label="Two"></glide-core-checkbox>
            <glide-core-checkbox label="Three" disabled></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    await callMethod(host, 'setCustomValidity', 'message');

    await expect(validityMessage).toHaveText('message', {
      useInnerText: true,
    });
  },
);

test(
  'supports `setCustomValidity()`',
  { tag: '@forms' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
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
    await mount(
      () => html`
        <form>
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label" checked></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const checkboxes = page.locator('glide-core-checkbox');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setValidity', { customError: true }, 'message');
    await checkboxes.nth(0).click();
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
          <glide-core-checkbox-group label="Label" required>
            <glide-core-checkbox label="Label"></glide-core-checkbox>
          </glide-core-checkbox-group>
        </form>
      `,
    );

    const host = page.locator('glide-core-checkbox-group');
    const validityMessage = page.locator('[data-test="validity-message"]');

    await callMethod(host, 'setCustomValidity', 'message');
    await callMethod(host, 'reportValidity');
    await callMethod(host, 'resetValidityFeedback');

    await expect(validityMessage).toBeHidden();
  },
);
