import { expect, test } from '@playwright/test';
import type Textarea from './textarea.js';
import { type Stories } from './playwright/types.js';

const stories = JSON.parse(process.env.STORIES ?? '{}') as Stories;

if (stories.Textarea) {
  for (const story of stories.Textarea) {
    /* eslint-disable playwright/valid-title */
    test.describe(story.id, () => {
      for (const theme of story.themes) {
        test.describe(theme, () => {
          test('disabled', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe('disabled=${true}', () => {
            test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.disabled = true;
                });

              await page.locator('glide-core-textarea').focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.disabled = true;
                });

              await page.locator('glide-core-textarea').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test.describe('disabled=${false}', () => {
            test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-textarea').focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-textarea').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test('hide-label', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.hideLabel = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('max-length', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.maxlength = 1;
              });

            await page.getByRole('textbox').fill('Test');

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe('orientation="horizontal"', () => {
            test(
              'tooltip="Tooltip"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-textarea')
                  .evaluate<void, Textarea>((element) => {
                    element.orientation = 'horizontal';
                    element.tooltip = 'Tooltip';
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test('tooltip=""', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.orientation = 'horizontal';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test.describe('orientation="vertical"', () => {
            test(
              'tooltip="Tooltip"',
              { tag: '@visuals' },
              async ({ page }, test) => {
                await page.goto(`?id=${story.id}&globals=theme:${theme}`);

                await page
                  .locator('glide-core-textarea')
                  .evaluate<void, Textarea>((element) => {
                    element.orientation = 'vertical';
                    element.tooltip = 'Tooltip';
                  });

                await expect(page).toHaveScreenshot(
                  `${test.titlePath.join('.')}.png`,
                );
              },
            );

            test('tooltip=""', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.orientation = 'vertical';
                });

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test('placeholder', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.placeholder = 'Placeholder';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('readonly', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.readonly = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test.describe('readonly=${true}', () => {
            test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.readonly = true;
                });

              await page.locator('glide-core-textarea').focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);

              await page
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
                  element.readonly = true;
                });

              await page.locator('glide-core-textarea').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test.describe('readonly=${false}', () => {
            test(':focus', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-textarea').focus();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });

            test(':hover', { tag: '@visuals' }, async ({ page }, test) => {
              await page.goto(`?id=${story.id}&globals=theme:${theme}`);
              await page.locator('glide-core-textarea').hover();

              await expect(page).toHaveScreenshot(
                `${test.titlePath.join('.')}.png`,
              );
            });
          });

          test('required', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
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
                .locator('glide-core-textarea')
                .evaluate<void, Textarea>((element) => {
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

          test('value', { tag: '@visuals' }, async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-textarea')
              .evaluate<void, Textarea>((element) => {
                element.value = 'Value';
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
