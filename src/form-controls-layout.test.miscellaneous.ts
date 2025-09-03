import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test('defines itself', { tag: '@miscellaneous' }, async ({ mount, page }) => {
  await mount(
    () => html`
      <glide-core-form-controls-layout>
        <glide-core-input label="Label"></glide-core-input>
        <glide-core-checkbox label="Label"></glide-core-checkbox>
      </glide-core-form-controls-layout>
    `,
  );

  const host = page.locator('glide-core-form-controls-layout');

  await expect(host).toBeDefined('glide-core-form-controls-layout');
});

test(
  'sets `privateSplit` on each control',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-form-controls-layout>
          <glide-core-input label="Label"></glide-core-input>
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-form-controls-layout>
      `,
    );

    const input = page.locator('glide-core-input');
    const checkbox = page.locator('glide-core-checkbox');

    await expect(input).toHaveJSProperty('privateSplit', 'left');
    await expect(checkbox).toHaveJSProperty('privateSplit', 'left');
  },
);

test(
  'sets `privateSplit` on each control when `split` is set programmatically',
  { tag: '@miscellaneous' },
  async ({ mount, page, setProperty }) => {
    await mount(
      () => html`
        <glide-core-form-controls-layout>
          <glide-core-input label="Label"></glide-core-input>
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-form-controls-layout>
      `,
    );

    const host = page.locator('glide-core-form-controls-layout');
    const input = page.locator('glide-core-input');
    const checkbox = page.locator('glide-core-checkbox');

    await setProperty(host, 'split', 'middle');

    await expect(input).toHaveJSProperty('privateSplit', 'middle');
    await expect(checkbox).toHaveJSProperty('privateSplit', 'middle');
  },
);

test(
  'cannot be extended',
  { tag: '@miscellaneous' },
  async ({ mount, page }) => {
    await mount(
      () => html`
        <glide-core-form-controls-layout>
          <glide-core-input label="Label"></glide-core-input>
          <glide-core-checkbox label="Label"></glide-core-checkbox>
        </glide-core-form-controls-layout>
      `,
    );

    const host = page.locator('glide-core-form-controls-layout');

    await expect(host).not.toBeExtensible();
  },
);

test(
  'throws when it does not have a default slot',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () =>
          html`<glide-core-form-controls-layout></glide-core-form-controls-layout>`,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws when its default slot is the wrong type',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-form-controls-layout>
            <input />
          </glide-core-form-controls-layout>
        `,
      ),
    ).rejects.toThrow();
  },
);

test(
  'throws if a vertical control is present',
  { tag: '@miscellaneous' },
  async ({ mount }) => {
    await expect(
      mount(
        () => html`
          <glide-core-form-controls-layout>
            <glide-core-input
              label="Label"
              orientation="vertical"
            ></glide-core-input>
          </glide-core-form-controls-layout>
        `,
      ),
    ).rejects.toThrow();
  },
);
