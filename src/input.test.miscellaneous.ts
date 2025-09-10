import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(() => html`<glide-core-input label="Label"></glide-core-input>`);

  const host = page.locator('glide-core-input');

  await expect(host).toBeInTheCustomElementRegistry('glide-core-input');
});

test(
  'can be focused programmatically',
  { tag: '@miscellaneous' },
  async ({ callMethod, mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');

    await callMethod(host, 'focus');

    await expect(host.getByRole('textbox')).toBeFocused();
  },
);

test(
  'has a search icon',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input label="Label" type="search"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const icon = host.locator('[data-test="search-icon"]');

    await expect(icon).toBeVisible();
  },
);

test(
  'has a max character and current character count',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input label="Label" maxlength="5"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');
    const characterCount = host.locator('[data-test="character-count-text"]');

    await expect(characterCount).toHaveText('0/5');
  },
);

test(
  'has no character count when the maxlength is zero',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-input label="Label" maxlength="0"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');

    const characterCountContainer = host.locator(
      '[data-test="character-count-container"]',
    );

    await expect(characterCountContainer).toBeHidden();
  },
);

test('can be readonly', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`<glide-core-input label="Label" readonly></glide-core-input>`,
  );

  const host = page.locator('glide-core-input');
  const input = host.locator('[data-test="input"]');

  await expect(host).toBeAttached();
  await expect(host).toHaveJSProperty('readonly', true);
  await expect(input).toHaveAttribute('readonly');
});

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`<glide-core-input label="Label"></glide-core-input>`,
    );

    const host = page.locator('glide-core-input');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when `label` is undefined',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(() => html`<glide-core-input></glide-core-input>`),
    ).rejects.toThrow();
  },
);
