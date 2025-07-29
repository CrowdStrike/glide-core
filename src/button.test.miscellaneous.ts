import { html } from 'lit/static-html.js';
import { expect, test } from './playwright/test.js';

test('registers itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    html`<glide-core-button label="Label"></glide-core-button>`,
    'button--test',
  );

  const host = page.locator('glide-core-button');
  await expect(host).toBeRegistered('glide-core-button');
});

test(
  'is accessible',
  { tag: '@miscellaneous' },
  async ({ isAccessible, mount, page, setAttribute }) => {
    await mount(
      html`<glide-core-button
        label="Label"
        aria-description="Description"
      ></glide-core-button>`,
      'button--test',
    );

    expect(await isAccessible('glide-core-button')).toStrictEqual([]);

    const host = page.locator('glide-core-button');
    await setAttribute(host, 'aria-description', 'Description');

    await expect(host.getByRole('button')).toHaveAttribute(
      'aria-description',
      'Description',
    );
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    expect(
      mount(html`<glide-core-button></glide-core-button>`, 'button--test'),
    ).rejects.toThrow();

    const host = page.locator('glide-core-button');

    await expect(host).toBeRegistered('glide-core-button');
  },
);
