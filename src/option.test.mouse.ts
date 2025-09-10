import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'checks its checkbox on click via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await checkbox.click();

    await expect(checkbox).toBeChecked();
  },
);

test(
  'unchecks its checkbox on click via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
          selected
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await checkbox.click();

    await expect(checkbox).not.toBeChecked();
  },
);

test(
  'checks its checkbox on click via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await callMethod(checkbox, 'click');

    await expect(checkbox).toBeChecked();
  },
);

test(
  'unchecks its checkbox on click via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      /* eslint-disable lit-a11y/role-has-required-aria-attrs */
      () =>
        html`<glide-core-option
          label="Label"
          role="option"
          multiple
          selected
        ></glide-core-option>`,
    );

    const checkbox = page.getByRole('checkbox');

    await callMethod(checkbox, 'click');

    await expect(checkbox).not.toBeChecked();
  },
);

test(
  'cancels navigation on click when disabled',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-option
          label="Label"
          href="/"
          disabled
        ></glide-core-option>`,
    );

    const menuitem = page.getByRole('menuitem');
    const tooltip = page.getByTestId('tooltip').first();

    await expect(tooltip).toDispatchEvents(
      () =>
        menuitem.click({
          // eslint-disable-next-line playwright/no-force-option
          force: true,
        }),
      [{ type: 'click', defaultPrevented: true }],
    );
  },
);

test(
  'cancels the original "click" event when `href` is present and its icon is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    let wasCanceled = false;

    await page.exposeFunction('onClick', (defaultPrevented: boolean) => {
      wasCanceled = defaultPrevented;
    });

    await mount(() => {
      const windowWithOnClick = window as typeof window & {
        onClick: (defaultPrevented: boolean) => void;
      };

      return html`
        <glide-core-option label="Label" href="/">
          <div
            slot="icon"
            @click=${(event: Event) => {
              // Wait a tick for `#onTooltipClick()` to cancel the event.
              setTimeout(() => {
                windowWithOnClick.onClick(event.defaultPrevented);
              });
            }}
          >
            *
          </div>
        </glide-core-option>
      `;
    });

    await page.locator('[slot="icon"]').click();

    // eslint-disable-next-line playwright/no-wait-for-timeout
    await page.waitForTimeout(0);

    expect(wasCanceled).toBe(true);
  },
);

test(
  'retargets content "click" events to itself',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => {
      return html`
        <glide-core-option label="Label" id="option">
          <div slot="content" id="content">Content</div>
        </glide-core-option>
      `;
    });

    const host = page.locator('glide-core-option');
    const content = page.locator('[slot="content"]');

    await expect(host).toDispatchEvents(
      () => content.click(),
      [
        {
          type: 'click',
          target: 'option',
        },
      ],
    );
  },
);

test(
  'does not retarget nested option "click" events to itself',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(() => {
      return html`<glide-core-option label="One" id="one">
        <glide-core-menu slot="submenu" open>
          <button slot="target">Target</button>

          <glide-core-options>
            <glide-core-option label="Two" id="two"></glide-core-option>
          </glide-core-options>
        </glide-core-menu>
      </glide-core-option>`;
    });

    const hosts = page.locator('glide-core-option');

    await expect(hosts.nth(0)).toDispatchEvents(
      () => hosts.nth(1).click(),
      [
        {
          type: 'click',
          target: 'two',
        },
      ],
    );
  },
);
