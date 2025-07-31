import { expect, test } from '@playwright/test';
import type Slider from './slider.js';

test.describe('disabled', () => {
  test('multiple=${true}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.disabled = true;
        element.multiple = true;
      });

    await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
      - text: Label
      - spinbutton "Set minimum Label" [disabled]
      - group:
        - slider "Minimum Label" [disabled]
        - slider "Maximum Label" [disabled]
      - spinbutton "Set maximum Label" [disabled]
    `);
  });

  test('multiple=${false}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.disabled = true;
      });

    await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
      - text: Label
      - group:
        - slider "Label" [disabled]
      - spinbutton "Label" [disabled]
    `);
  });
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=slider--slider');

  await page.locator('glide-core-slider').evaluate<void, Slider>((element) => {
    element.hideLabel = true;
  });

  await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
    - text: Label
    - group:
      - slider "Label"
    - spinbutton "Label"
  `);
});

test('multiple', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=slider--slider');

  await page.locator('glide-core-slider').evaluate<void, Slider>((element) => {
    element.multiple = true;
  });

  await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
    - text: Label
    - spinbutton "Set minimum Label"
    - group:
      - slider "Minimum Label"
      - slider "Maximum Label"
    - spinbutton "Set maximum Label"
  `);
});

test.describe('readonly', () => {
  test('multiple=${true}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.readonly = true;
        element.multiple = true;
      });

    await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
      - text: Label
      - spinbutton "Set minimum Label"
      - group:
        - slider "Minimum Label"
        - slider "Maximum Label"
      - spinbutton "Set maximum Label"
    `);
  });

  test('multiple=${false}', { tag: '@accessibility' }, async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.readonly = true;
      });

    await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
      - text: Label
      - group:
        - slider "Label"
      - spinbutton "Label"
    `);
  });
});

test('slot="description"', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=slider--slider');

  await page.locator('glide-core-slider').evaluate<void, Slider>((element) => {
    const div = document.createElement('div');

    div.textContent = 'Description';
    div.slot = 'description';

    element.append(div);
  });

  await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
    - text: Label
    - group:
      - slider "Label"
    - spinbutton "Label"
    - text: Description
  `);
});

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=slider--slider');

  await page.locator('glide-core-slider').evaluate<void, Slider>((element) => {
    element.tooltip = 'Tooltip';
  });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-slider')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - group:
      - slider "Label"
    - spinbutton "Label"
  `);
});
