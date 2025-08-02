import { expect, test } from '@playwright/test';
import type CheckboxGroup from './checkbox-group.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories['Checkbox Group']) {
  for (const story of stories['Checkbox Group']) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox-group')
              .evaluate<void, CheckboxGroup>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.getByRole('checkbox').first().focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.getByRole('checkbox').first().hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('hide-label', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox-group')
              .evaluate<void, CheckboxGroup>((element) => {
                element.hideLabel = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('required', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox-group')
              .evaluate<void, CheckboxGroup>((element) => {
                element.required = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(
            'slot="description"',
            { tag: '@visuals' },
            async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-checkbox-group')
                .evaluate<void, CheckboxGroup>((element) => {
                  const div = document.createElement('div');

                  div.textContent = 'Description';
                  div.slot = 'description';

                  element.append(div);
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            },
          );

          test('tooltip', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox-group')
              .evaluate<void, CheckboxGroup>((element) => {
                element.tooltip = 'Tooltip';
              });

            await page
              .locator('glide-core-tooltip')
              .getByRole('button')
              .focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('value', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-checkbox-group')
              .evaluate<void, CheckboxGroup>((element) => {
                element.value = ['one'];
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });
      }
    });
  }
}
