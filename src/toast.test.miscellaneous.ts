import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-toast label="Label"></glide-core-toast>`);

  const host = page.locator('glide-core-toast');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-toast');
});

test('can have a label', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  await mount(() => html`<glide-core-toast label="Label"></glide-core-toast>`);

  const alert = page.getByRole('alert');

  await expect(alert).toContainText('Label');
});

test(
  'can have a description',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(
      () =>
        html`<glide-core-toast label="Label"> Description </glide-core-toast>`,
    );

    const alert = page.getByRole('alert');

    await expect(alert).toContainText('Description');
  },
);

test(
  'dismisses itself when animated',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(() => {
      return html`<div data-test="container">
        <glide-core-toast label="Label" duration="1000"></glide-core-toast>
      </div>`;
    });

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(() => {
      // eslint-disable-next-line playwright/no-wait-for-timeout
      return page.waitForTimeout(1000);
    }, [{ type: 'dismiss', bubbles: true, composed: true }]);

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'dismisses itself when not animated',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });

    await mount(() => {
      return html`<div data-test="container">
        <glide-core-toast label="Label" duration="1000"></glide-core-toast>
      </div>`;
    });

    const container = page.getByTestId('container');
    const host = page.locator('glide-core-toast');
    const alert = page.getByRole('alert');

    await expect(container).toDispatchEvents(() => {
      // eslint-disable-next-line playwright/no-wait-for-timeout
      return page.waitForTimeout(1000);
    }, [{ type: 'dismiss', bubbles: true, composed: true }]);

    await expect(host).not.toBeAttached();
    await expect(alert).not.toBeAttached();
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-toast label="Label"></glide-core-toast>`,
    );

    const host = page.locator('glide-core-toast');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-toast></glide-core-toast>`),
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
          html`<glide-core-toast label="Label">
            <button>Label</button>
          </glide-core-toast>`,
      ),
    ).rejects.toThrow();
  },
);
