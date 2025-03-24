import { expect, test } from '@playwright/test';
import type GlideCoreRadioGroup from './radio-group.js';
import type GlideCoreRadioGroupRadio from './radio-group.radio.js';

test('disabled', async ({ page }, test) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, GlideCoreRadioGroup>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('slot="description"', async ({ page }, test) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, GlideCoreRadioGroup>((element) => {
      const div = document.createElement('div');

      div.textContent = 'Description';
      div.slot = 'description';

      element.append(div);
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('tooltip', async ({ page }, test) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group')
    .evaluate<void, GlideCoreRadioGroup>((element) => {
      element.tooltip = 'Tooltip';
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-radio-group-radio>.disabled', async ({ page }, test) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group-radio')
    .first()
    .evaluate<void, GlideCoreRadioGroupRadio>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-radio-group-radio>[checked=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=radio-group--radio-group');

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-radio-group-radio>[checked=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=radio-group--radio-group');

  await page
    .locator('glide-core-radio-group-radio')
    .first()
    .evaluate<void, GlideCoreRadioGroupRadio>((element) => {
      element.checked = false;
    });

  await expect(page.locator('glide-core-radio-group')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
