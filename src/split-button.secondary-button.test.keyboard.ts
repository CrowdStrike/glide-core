import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'sets its `menuOpen` attribute when its menu is opened via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-secondary-button label="Label">
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-split-button-secondary-button>`,
    );

    const host = page.locator('glide-core-split-button-secondary-button');
    const button = page.getByRole('button');

    await button.press('Space');

    await expect(host).toHaveJSProperty('menuOpen', true);
  },
);

test(
  'sets it `menuOpen` attribute when its menu is closed via Space',
  { tag: '@keyboard' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-split-button-secondary-button label="Label" menu-open>
          <glide-core-option label="Label"></glide-core-option>
        </glide-core-split-button-secondary-button>`,
    );

    const host = page.locator('glide-core-split-button-secondary-button');
    const button = page.getByRole('button');

    await button.press('Space');

    await expect(host).toHaveJSProperty('menuOpen', false);
  },
);
