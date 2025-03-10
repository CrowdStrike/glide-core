import { expect, test } from '@playwright/test';
import type GlideCoreCheckboxGroup from './checkbox-group.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories['Checkbox Group']) {
  test.describe(story, () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
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
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto(story);

      await page
        .locator('glide-core-checkbox-group')
        .evaluate<void, GlideCoreCheckboxGroup>((element) => {
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
}
