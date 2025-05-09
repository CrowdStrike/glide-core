import { expect, test } from '@playwright/test';
import type Toggle from './toggle.js';

test('checked=${true}', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.checked = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label" [checked]
  `);
});

test('checked=${false}', async ({ page }) => {
  await page.goto('?id=toggle--toggle');
  await page.locator('glide-core-toggle').waitFor();

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label" [disabled]
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=toggle--toggle');
  await page.locator('glide-core-toggle').waitFor();

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('hide-label', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.hideLabel = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    const div = document.createElement('div');

    div.textContent = 'Description';
    div.slot = 'description';

    element.append(div);
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
    - text: Description
  `);
});

test('summary', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.summary = 'Summary';
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
    - text: Summary
    `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.tooltip = 'Tooltip';
  });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - switch "Label"
  `);
});
