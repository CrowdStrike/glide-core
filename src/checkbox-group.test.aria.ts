import { expect, test } from '@playwright/test';
import type GlideCoreCheckboxGroup from './checkbox-group.js';
import type GlideCoreCheckbox from './checkbox.js';

test('disabled=${true}', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label":
      - checkbox "One" [disabled]
      - checkbox "Two" [disabled]
      - checkbox "Three" [disabled]
      - text: Three
  `);
});

test('disabled=${false}', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label":
      - checkbox "One"
      - checkbox "Two"
      - checkbox "Three"
      - text: Three
  `);
});

test('hide-label', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label":
      - checkbox "One"
      - checkbox "Two"
      - checkbox "Three"
      - text: Three
  `);
});

test('slot="description"', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label Description":
      - checkbox "One"
      - checkbox "Two"
      - checkbox "Three"
    - text: Description
  `);
});

test('tooltip', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - button "Tooltip:"
    - tooltip "Tooltip"
    - text: Label
    - group "Label":
      - checkbox "One"
      - checkbox "Two"
      - checkbox "Three"
      - text: Three
  `);
});

test('<glide-core-checkbox>[checked=${true}]', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox')
    .first()
    .evaluate<void, GlideCoreCheckbox>((element) => {
      element.checked = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label":
      - checkbox "One" [checked]
      - checkbox "Two"
      - checkbox "Three"
      - text: Three
  `);
});

test('<glide-core-checkbox>[checked=${false}]', async ({ page }) => {
  await page.goto('?id=checkbox-group--checkbox-group');
  await page.locator('glide-core-checkbox-group').waitFor();

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot(`
    - text: Label
    - group "Label":
      - checkbox "One"
      - checkbox "Two"
      - checkbox "Three"
      - text: Three
  `);
});
