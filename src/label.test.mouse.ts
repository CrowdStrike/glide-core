import { html } from 'lit';
import { expect, test } from './playwright/test.js';

test(
  'enables its label tooltip on hover when its label is overflowing',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label>
          <label> ${'x'.repeat(500)} </label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const tooltip = page.getByTestId('label-tooltip');
    const label = page.locator('label');

    await label.hover();

    await expect(tooltip).not.toHaveAttribute('disabled');
  },
);

test(
  'disables its label tooltip on hover when its label is not overflowing',
  { tag: '@mouse' },
  async ({ mount, page }) => {
    await mount(
      () =>
        html`<glide-core-private-label>
          <label> Label </label>
          <input slot="control" />
        </glide-core-private-label>`,
    );

    const tooltip = page.getByTestId('label-tooltip');
    const label = page.locator('label');

    await label.hover();

    await expect(tooltip).toHaveAttribute('disabled');
  },
);
