import { expect, test } from '@playwright/test';
import type Input from './input.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Input');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('clearable', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.clearable = true;
            });

          await page.getByRole('textbox').fill('Test');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('disabled=${true}', () => {
          test(':focus', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.disabled = true;
              });

            await page.locator('glide-core-input').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.disabled = true;
              });

            await page.locator('glide-core-input').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('disabled=${false}', () => {
          test(':focus', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-input').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-input').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('max-length', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.maxlength = 1;
            });

          await page.getByRole('textbox').fill('Test');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('orientation="horizontal"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.orientation = 'horizontal';
                element.tooltip = 'Tooltip';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('tooltip=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.orientation = 'horizontal';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('orientation="vertical"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.orientation = 'vertical';
                element.tooltip = 'Tooltip';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('tooltip=""', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.orientation = 'vertical';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('password-toggle', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.passwordToggle = true;
              element.type = 'password';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placeholder', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.placeholder = 'Placeholder';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('readonly', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.readonly = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('readonly=${true}', () => {
          test(':focus', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.readonly = true;
              });

            await page.locator('glide-core-input').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-input')
              .evaluate<void, Input>((element) => {
                element.readonly = true;
              });

            await page.locator('glide-core-input').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('readonly=${false}', () => {
          test(':focus', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-input').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test(':hover', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.locator('glide-core-input').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('required', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.required = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="color"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'color';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="date"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'date';
            });

          await page.getByRole('textbox').fill('2009-01-03');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="email"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'email';
            });

          await page.getByRole('textbox').fill('crowdstrike@example.com');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="number"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'number';
            });

          await page.getByRole('spinbutton').fill('9');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="password"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'password';
            });

          await page.getByRole('textbox').fill('password');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="search"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'search';
            });

          await page.getByRole('searchbox').fill('Test');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="tel"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'tel';
            });

          await page.getByRole('textbox').fill('555-0123');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="text"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-input').waitFor();
          await page.getByRole('textbox').fill('Test');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="time"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'time';
            });

          await page.getByRole('textbox').fill('00:00');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('type="url"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-input')
            .evaluate<void, Input>((element) => {
              element.type = 'url';
            });

          await page.getByRole('textbox').fill('https://www.crowdstrike.com');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });
      });
    }
  });
}
