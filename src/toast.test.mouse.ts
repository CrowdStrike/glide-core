import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'dismisses itself when animated and its dismiss button is clicked via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast
            label="Label"
            duration="Infinity"
          ></glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const button = page.getByRole('button');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(
      () => button.click(),
      [{ type: 'dismiss', bubbles: true, cancelable: false, composed: true }],
    );

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dismisses itself when not animated its dismiss button is clicked via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast
            label="Label"
            duration="Infinity"
          ></glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const button = page.getByRole('button');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(
      () => button.click(),
      [{ type: 'dismiss', bubbles: true, cancelable: false, composed: true }],
    );

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dismisses itself when animated its dismiss button is clicked via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast
            label="Label"
            duration="Infinity"
          ></glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const button = page.getByRole('button');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(
      () => callMethod(button, 'click'),
      [{ type: 'dismiss', bubbles: true, cancelable: false, composed: true }],
    );

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dismisses itself when not animated and its dismiss button is clicked via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast
            label="Label"
            duration="Infinity"
          ></glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const button = page.getByRole('button');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(
      () => callMethod(button, 'click'),
      [{ type: 'dismiss', bubbles: true, cancelable: false, composed: true }],
    );

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'does not dismiss itself when hovered',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // `2000` is long enough that the asynchronous calls below have enough time to
    // complete before Toast dismisses itself but short enough the test doesn't take
    // too long.
    await mount(
      () => html`
        <div data-test="container">
          <glide-core-toast label="Label" duration="2000"></glide-core-toast>
        </div>
      `,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const alert = page.getByRole('alert');

    await expect(container).not.toDispatchEvents(async () => {
      await alert.hover();

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2000);
    }, [{ type: 'dismiss' }]);

    await expect(host).toBeAttached();
    await expect(alert).toBeAttached();
  },
);

test(
  'dismisses itself when animated and hovered away from',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <div data-test="container">
          <glide-core-toast label="Label" duration="2000"></glide-core-toast>
        </div>
      `,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const alert = page.getByRole('alert');

    await alert.hover();

    await expect(container).toDispatchEvents(async () => {
      await page.mouse.move(0, 0);

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2000);
    }, [{ type: 'dismiss' }]);

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dismisses itself when not animated and hovered away from',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    // `2000` is long enough that the asynchronous calls below have enough time to
    // complete before Toast dismisses itself but short enough the test doesn't take
    // too long.
    await mount(
      () => html`
        <div data-test="container">
          <glide-core-toast label="Label" duration="2000"></glide-core-toast>
        </div>
      `,
    );

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const alert = page.getByRole('alert');

    await alert.hover();

    await expect(container).toDispatchEvents(async () => {
      await page.mouse.move(0, 0);

      // eslint-disable-next-line playwright/no-wait-for-timeout
      await page.waitForTimeout(2000);
    }, [{ type: 'dismiss' }]);

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dispatches a "click" event when a link is clicked via mouse',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast label="Label" duration="Infinity">
            <glide-core-link label="Link"></glide-core-link>
          </glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const link = page.locator('glide-core-link').nth(1);

    await expect(container).toDispatchEvents(
      () => link.click(),
      [
        {
          type: 'click',
          bubbles: true,
          cancelable: true,
          composed: true,
          defaultPrevented: false,
        },
      ],
    );
  },
);

test(
  'dispatches a "click" event when a link is clicked via `click()`',
  { tag: '@mouse' },
  async ({ callMethod, mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast label="Label" duration="Infinity">
            <glide-core-link label="Link"></glide-core-link>
          </glide-core-toast>
        </div>`,
    );

    const container = page.getByTestId('container');
    const link = page.locator('glide-core-link').nth(1);

    await expect(container).toDispatchEvents(
      () => callMethod(link, 'click'),
      [
        {
          type: 'click',
          bubbles: true,
          cancelable: true,
          composed: true,
          defaultPrevented: false,
        },
      ],
    );
  },
);

test(
  'cancels the original "click" event when a link is clicked',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<div data-test="container">
          <glide-core-toast label="Label" duration="Infinity">
            <glide-core-link label="Link"></glide-core-link>
          </glide-core-toast>
        </div>`,
    );

    const description = page.getByTestId('description');
    const link = page.locator('glide-core-link').nth(1);

    await expect(description).toDispatchEvents(
      () => link.click(),
      [
        {
          type: 'click',
          defaultPrevented: true,
        },
      ],
    );
  },
);
