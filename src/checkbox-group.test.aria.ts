import { expect, test } from '@playwright/test';
import type GlideCoreCheckboxGroup from './checkbox-group.js';
import type GlideCoreCheckbox from './checkbox.js';

test('disabled=${true}', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('disabled=${false}', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('hide-label', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.hideLabel = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="description"', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox-group')
    .evaluate<void, GlideCoreCheckboxGroup>((element) => {
      element.tooltip = 'Tooltip';
    });

  await page.locator('glide-core-tooltip').getByRole('button').focus();

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-checkbox>[checked=${true}]', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');

  await page
    .locator('glide-core-checkbox')
    .first()
    .evaluate<void, GlideCoreCheckbox>((element) => {
      element.checked = true;
    });

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-checkbox>[checked=${false}]', async ({ page }, test) => {
  await page.goto('?id=checkbox-group--checkbox-group');
  await page.locator('glide-core-checkbox-group').waitFor();

  await expect(page.locator('glide-core-checkbox-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
