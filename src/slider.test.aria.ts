import { expect, test } from '@playwright/test';
import type Slider from './slider.js';

test('hide-label', async ({ page }) => {
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

test('multiple', async ({ page }) => {
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

test.describe('multiple=${true}', () => {
  test('disabled', async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.multiple = true;
        element.disabled = true;
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

  test('readonly', async ({ page }) => {
    await page.goto('?id=slider--slider');

    await page
      .locator('glide-core-slider')
      .evaluate<void, Slider>((element) => {
        element.multiple = true;
        element.readonly = true;
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
});

test.describe('multiple=${false}', () => {
  test('disabled', async ({ page }) => {
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

  test('readonly', async ({ page }) => {
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

test('slot="description"', async ({ page }) => {
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

test('tooltip', async ({ page }) => {
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
