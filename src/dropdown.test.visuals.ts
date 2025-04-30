import { expect, test } from '@playwright/test';
import type GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

const stories = JSON.parse(process.env.STORIES ?? '');

for (const story of stories.Dropdown) {
  test.describe(story.id, () => {
    for (const theme of story.themes) {
      test.describe(theme, () => {
        test('add-button-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.addButtonLabel = 'Add';
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('disabled', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.disabled = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('filterable', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.filterable = true;
            });

          await page.getByRole('combobox').fill('test');

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe(':focus', () => {
          test('filterable=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, GlideCoreDropdown>((element) => {
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
        });

        test('hide-label', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.hideLabel = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(':hover', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);
          await page.locator('glide-core-dropdown').hover();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('loading', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.open = true;
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('orientation="vertical"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.orientation = 'vertical';
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('placeholder', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.multiple = true;
              element.open = true;
              element.selectAll = true;
              element.value = ['one'];
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test.describe('size="large"', () => {
          test('multiple=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.multiple = true;
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
                element.selected = true;
                element.count = 1000;
                element.editable = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('multiple=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
                element.selected = true;
                element.count = 1000;
                element.editable = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test.describe('size="small"', () => {
          test('multiple=${true}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.multiple = true;
                element.open = true;
                element.size = 'small';
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
                element.selected = true;
                element.count = 1000;
                element.editable = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });

          test('multiple=${false}', async ({ page }, test) => {
            await page.goto(`?id=${story.id}&globals=theme:${theme}`);

            await page
              .locator('glide-core-dropdown')
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.open = true;
                element.size = 'small';
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
                element.selected = true;
                element.count = 1000;
                element.editable = true;
              });

            await expect(page).toHaveScreenshot(
              `${test.titlePath.join('.')}.png`,
            );
          });
        });

        test('slot="description"', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              const div = document.createElement('div');

              div.textContent = 'Description';
              div.slot = 'description';

              element.append(div);
            });

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test('tooltip', async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
              element.tooltip = 'Tooltip';
            });

          await page.locator('glide-core-tooltip').getByRole('button').focus();

          await expect(page).toHaveScreenshot(
            `${test.titlePath.join('.')}.png`,
          );
        });

        test(`value="['one']"`, async ({ page }, test) => {
          await page.goto(`?id=${story.id}&globals=theme:${theme}`);

          await page
            .locator('glide-core-dropdown')
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
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
            .evaluate<void, GlideCoreDropdown>((element) => {
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
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
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
              .evaluate<void, GlideCoreDropdown>((element) => {
                element.multiple = true;
                element.open = true;
              });

            await page
              .locator('glide-core-dropdown-option')
              .first()
              .evaluate<void, GlideCoreDropdownOption>((element) => {
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
