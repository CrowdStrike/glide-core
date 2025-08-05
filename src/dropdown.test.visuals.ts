import { expect, test } from './playwright/test.js';
import type Dropdown from './dropdown.js';
import type DropdownOption from './dropdown.option.js';
import fetchStories from './playwright/fetch-stories.js';

const stories = await fetchStories('Dropdown');

for (const story of stories) {
  /* eslint-disable playwright/valid-title */
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('filter("add")', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.addButton = true;
              element.filterable = true;
              element.open = true;
            });

          await page.getByRole('combobox').fill('add');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('filter("noMatchingOptions")', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.filterable = true;
              element.open = true;
            });

          await page.getByRole('combobox').fill('noMatchingOptions');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('filter("o")', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.addButton = true;
              element.filterable = true;
              element.open = true;
            });

          await page.getByRole('combobox').fill('o');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':focus', () => {
          test('filterable=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.filterable = true;
              });

            await page.getByRole('combobox').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('filterable=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.getByRole('button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.disabled = true;
              });

            await page.getByRole('button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('readonly', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.readonly = true;
              });

            await page.getByRole('button').focus();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe(':hover', () => {
          test('filterable=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.filterable = true;
              });

            await page.getByRole('combobox').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('filterable=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);
            await page.getByRole('button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('disabled', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.disabled = true;
              });

            await page.getByRole('button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('readonly', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.readonly = true;
              });

            await page.getByRole('button').hover();

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('loading', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.loading = true;
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('open', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('orientation="horizontal"', () => {
          test('tooltip="Tooltip"', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
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
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
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
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
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
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.orientation = 'vertical';
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('placeholder', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.placeholder = 'Placeholder';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('readonly', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.readonly = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('required', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.required = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('select-all', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.multiple = true;
              element.open = true;
              element.selectAll = true;
              element.value = ['one'];
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('slot="description"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(`value="['one']"`, async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.open = true;
              element.value = ['one'];
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(`value="['one', 'two']"`, async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.multiple = true;
              element.value = ['one', 'two'];
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('variant="quiet"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, Dropdown>((element) => {
              element.variant = 'quiet';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('<glide-core-dropdown-option>.disabled', () => {
          test('multiple=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, DropdownOption>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('multiple=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, Dropdown>((element) => {
                element.multiple = true;
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, DropdownOption>((element) => {
                element.disabled = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });
      });
    }
  });
}
