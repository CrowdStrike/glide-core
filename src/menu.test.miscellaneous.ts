import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () =>
      html`<glide-core-menu>
        <button slot="target">Label</button>

        <glide-core-options>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-options>
      </glide-core-menu>`,
  );

  const host = page.locator('glide-core-menu');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-menu');
});

test(
  'can be open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const hosts = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');
    const menuitems = page.getByRole('menuitem');
    const defaultSlots = page.getByTestId('default-slot');

    await expect(hosts.nth(0)).toHaveAttribute('open');
    await expect(hosts.nth(1)).toHaveAttribute('open');
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(menuitems.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(menuitems.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(defaultSlots.nth(0)).toBeVisible();
    await expect(defaultSlots.nth(1)).toBeVisible();
  },
);

test(
  'can be opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu">
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const hosts = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');
    const menuitems = page.getByRole('menuitem');
    const defaultSlots = page.getByTestId('default-slot');

    await setProperty(hosts.nth(0), 'open', true);
    await setProperty(hosts.nth(1), 'open', true);

    await expect(hosts.nth(0)).toHaveAttribute('open');
    await expect(hosts.nth(1)).toHaveAttribute('open');
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(buttons.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(menuitems.nth(0)).toHaveAttribute('aria-expanded', 'true');
    await expect(menuitems.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(defaultSlots.nth(0)).toBeVisible();
    await expect(defaultSlots.nth(1)).toBeVisible();
  },
);

test(
  'closes open sub-Menus when closed initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const hosts = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await expect(hosts.nth(0)).not.toHaveAttribute('open');
    await expect(hosts.nth(1)).not.toHaveAttribute('open');
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(0)).toBeHidden();
    await expect(defaultSlots.nth(1)).toBeHidden();
  },
);

test(
  'closes open sub-Menus when closed programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const hosts = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await setProperty(hosts.nth(0), 'open', false);

    await expect(hosts.nth(1)).not.toHaveAttribute('open');
    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(1)).toBeHidden();
  },
);

test(
  'closes all but its first open sub-Menu when multiple sub-Menus are open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">One</button>

          <glide-core-options>
            <glide-core-option label="One">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Two</button>

                <glide-core-options>
                  <glide-core-option label="Two"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>

            <glide-core-option label="Three">
              <glide-core-menu slot="submenu" open>
                <button slot="target">Three</button>

                <glide-core-options>
                  <glide-core-option label="Four"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const hosts = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');
    const menuitems = page.getByRole('menuitem');
    const defaultSlots = page.getByTestId('default-slot');

    await setProperty(hosts.nth(1), 'open', true);
    await setProperty(hosts.nth(2), 'open', false);

    await expect(hosts.nth(1)).toHaveAttribute('open');
    await expect(hosts.nth(2)).not.toHaveAttribute('open');
    await expect(buttons.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(buttons.nth(2)).not.toHaveAttribute('aria-expanded');
    await expect(menuitems.nth(1)).not.toHaveAttribute('aria-expanded');
    await expect(menuitems.nth(2)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(1)).toBeVisible();
    await expect(defaultSlots.nth(2)).toBeHidden();
  },
);

// TODO: add programmatic test for here and above tests
test(
  'activates its first enabled Option(s) when open initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="One" disabled>
              <glide-core-menu slot="submenu" open>
                <button slot="target">Target</button>

                <glide-core-options>
                  <glide-core-option label="Two" disabled>
                    <glide-core-menu slot="submenu" open>
                      <button slot="target">Target</button>

                      <glide-core-options>
                        <glide-core-option
                          label="Three"
                          disabled
                        ></glide-core-option>

                        <glide-core-option label="Four"></glide-core-option>
                        <glide-core-option label="Five"></glide-core-option>
                      </glide-core-options>
                    </glide-core-menu>
                  </glide-core-option>

                  <glide-core-option label="Six"></glide-core-option>
                  <glide-core-option label="Seven"></glide-core-option>
                </glide-core-options>
              </glide-core-menu>
            </glide-core-option>

            <glide-core-option label="Eight"></glide-core-option>
            <glide-core-option label="Nine"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const menuitems = page.getByRole('menuitem');
    const listboxes = page.getByRole('menu');

    await expect(menuitems.nth(0)).toHaveJSProperty('privateActive', false);
    await expect(menuitems.nth(1)).toHaveJSProperty('privateActive', false);
    await expect(menuitems.nth(2)).toHaveJSProperty('privateActive', false);
    await expect(menuitems.nth(3)).toHaveJSProperty('privateActive', true);
    await expect(menuitems.nth(4)).toHaveJSProperty('privateActive', false);
    await expect(menuitems.nth(5)).toHaveJSProperty('privateActive', true);
    await expect(menuitems.nth(6)).toHaveJSProperty('privateActive', false);
    await expect(menuitems.nth(7)).toHaveJSProperty('privateActive', true);
    await expect(menuitems.nth(8)).toHaveJSProperty('privateActive', false);

    await expect(listboxes.nth(0)).toHaveAttribute(
      'aria-activedescendant',
      await menuitems.nth(7).evaluate((element) => element.id),
    );

    await expect(listboxes.nth(1)).toHaveAttribute(
      'aria-activedescendant',
      await menuitems.nth(5).evaluate((element) => element.id),
    );

    await expect(listboxes.nth(2)).toHaveAttribute(
      'aria-activedescendant',
      await menuitems.nth(3).evaluate((element) => element.id),
    );
  },
);

test(
  'is not opened when its target is disabled initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target" disabled>Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(0)).toBeHidden();
  },
);

test(
  'is not opened when its target is disabled programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await setProperty(buttons.nth(0), 'disabled', true);

    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(0)).toBeHidden();
  },
);

test(
  'is not opened when its target is `aria-disabled` is set initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target" aria-disabled="true">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(0)).toBeHidden();
  },
);

// TODO: test the inverse here and above: is opened when
test(
  'is not opened when its target is `aria-disabled` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const defaultSlots = page.getByTestId('default-slot');

    await setProperty(buttons.nth(0), 'ariaDisabled', 'true');

    await expect(buttons.nth(0)).toHaveAttribute('aria-expanded', 'false');
    await expect(defaultSlots.nth(0)).toBeHidden();
  },
);

test(
  'shows loading feedback when open and loading initially',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu loading open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const buttons = page.getByRole('button');
    const loadingFeedback = page.getByTestId('loading-feedback');

    await expect(buttons.nth(0)).toHaveAttribute('aria-description', 'Loading');
    await expect(loadingFeedback).toBeVisible();
  },
);

test(
  'shows loading feedback when open initially and made loading programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const host = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');

    await setProperty(host, 'loading', true);

    await expect(buttons.nth(0)).toHaveAttribute('aria-description', 'Loading');
    await expect(page.getByTestId('loading-feedback')).toBeVisible();
  },
);

test(
  'hides loading feedback when open initially and made not loading programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu loading open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const host = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');

    await setProperty(host, 'loading', false);

    await expect(buttons.nth(0)).not.toHaveAttribute('aria-description');
    await expect(page.getByTestId('loading-feedback')).toBeHidden();
  },
);

test(
  'shows loading feedback when loading initially and opened programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () =>
        html`<glide-core-menu loading>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const host = page.locator('glide-core-menu');
    const buttons = page.getByRole('button');

    await setProperty(host, 'open', true);

    await expect(buttons.nth(0)).toHaveAttribute('aria-description', 'Loading');
    await expect(page.getByTestId('loading-feedback')).toBeVisible();
  },
);

// sets the first enabled Option as active when Optionless and Options are added programmatically
// sets the next enabled Option as active when the active Option is disabled programmatically
// sets the previously enabled Option as active when current Option is disabled programmatically
// retains its active Option when an Option is programmatically added
// closes sibling sub-Menus when a new sub-Menu is opened programmatically
// closes its nested sub-Menu when the super-Menu of the sub-Menu is closed programmatically

test(
  'does not clobber the ID of its target',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <button slot="target" id="id">Label</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const button = page.getByRole('button');

    await expect(button).toHaveJSProperty('id', 'id');
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-menu>
          <button slot="target">Label</button>

          <glide-core-options>
            <glide-core-option label="Label"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>`,
    );

    const host = page.locator('glide-core-menu');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when its default slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-menu>
            <button slot="target">Label</button>
          </glide-core-menu>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its "target" slot is empty',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-menu>
            <glide-core-options>
              <glide-core-option label="Label"></glide-core-option>
            </glide-core-options>
          </glide-core-menu>`,
      ),
    ).rejects.toThrow();
  },
);
