import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('has a `form` property', { tag: '@forms' }, async ({ mount, page }) => {
  await mount(html`
    <form>
      <glide-core-select>
        <button slot="target">Target</button>
        <glide-core-options></glide-core-options>
      </glide-core-select>
    </form>
  `);

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
    await mount(html`
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
    `);

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
    await mount(html`
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
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', JSON.stringify(['one']));
  },
);

test(
  'has no form data when no option is selected',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-select name="name">
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'has no form data when without a name',
  { tag: '@forms' },
  async ({ mount, page }) => {
    await mount(html`
      <form>
        <glide-core-select>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" value="one"></glide-core-option>
            <glide-core-option label="Two" value="two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      </form>
    `);

    const form = page.locator('form');

    await expect(form).toHaveFormData('name', null);
  },
);

test(
  'submits its form on Enter when closed',
  { tag: '@forms' },
  async ({ addEventListener, mount, page }) => {
    await mount(html`
      <form>
        <glide-core-select>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One"></glide-core-option>
            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      </form>
    `);

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
    await mount(html`
      <form>
        <glide-core-select open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One"></glide-core-option>
            <glide-core-option label="Two"></glide-core-option>
          </glide-core-options>
        </glide-core-select>
      </form>
    `);

    const form = page.locator('form');
    const target = page.getByRole('button');

    await addEventListener(form, 'submit', {
      preventDefault: true,
    });

    // TODO: update similar assertions
    await expect(form).not.toDispatchEvents(
      () => target.press('Enter'),
      [{ type: 'submit' }],
    );
  },
);
