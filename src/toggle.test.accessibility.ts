import type Toggle from './toggle.js';
import { expect, test } from '@/src/playwright/test.js';

test('checked=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.checked = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label" [checked]
  `);
});

test('checked=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toggle--toggle');
  await page.locator('glide-core-toggle').waitFor();

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('disabled=${true}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.disabled = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label" [disabled]
  `);
});

test('disabled=${false}', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toggle--toggle');
  await page.locator('glide-core-toggle').waitFor();

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('hide-label', { tag: '@accessibility' }, async ({ page }) => {
  await page.goto('?id=toggle--toggle');

  await page.locator('glide-core-toggle').evaluate<void, Toggle>((element) => {
    element.hideLabel = true;
  });

  await expect(page.locator('glide-core-toggle')).toMatchAriaSnapshot(`
    - text: Label
    - switch "Label"
  `);
});

test('slot="description"', { tag: '@accessibility' }, async ({ page }) => {
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

test('summary', { tag: '@accessibility' }, async ({ page }) => {
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

test('tooltip', { tag: '@accessibility' }, async ({ page }) => {
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
