import { expect, test } from '@playwright/test';
import type GlideCoreRadioGroup from './radio-group.js';
import type GlideCoreRadioGroupRadio from './radio-group.radio.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Radio Group']) {
  test.describe(story, () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-radio-group')
        .evaluate<void, GlideCoreRadioGroup>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hover', async ({ page }, test) => {
      await page.goto(story);
      await page.locator('glide-core-radio-group').waitFor();
      await page.locator('glide-core-radio-group-radio').nth(1).hover();
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-radio-group')
        .evaluate<void, GlideCoreRadioGroup>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-radio-group')
        .evaluate<void, GlideCoreRadioGroup>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-radio-group')
        .evaluate<void, GlideCoreRadioGroup>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('<glide-core-radio-group-radio>.disabled', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-radio-group-radio')
        .nth(1)
        .evaluate<void, GlideCoreRadioGroupRadio>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
