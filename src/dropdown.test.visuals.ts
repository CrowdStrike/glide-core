import { expect, test } from '@playwright/test';
import type GlideCoreDropdown from './dropdown.js';
import type GlideCoreDropdownOption from './dropdown.option.js';

test.describe('dropdown--dropdown', () => {
  test.describe('globals=theme:light', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one', 'two']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.value = ['one', 'two'];
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('<glide-core-dropdown-option>.disabled', () => {
      test('multiple=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-dropdown')
          .first()
          .evaluate<void, GlideCoreDropdown>((element) => {
            element.open = true;
          });

        await page
          .locator('glide-core-dropdown-option')
          .first()
          .evaluate<void, GlideCoreDropdownOption>((element) => {
            element.disabled = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('multiple=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-dropdown')
          .first()
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

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('<glide-core-dropdown-option>.editable', () => {
      test('multiple=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-dropdown')
          .first()
          .evaluate<void, GlideCoreDropdown>((element) => {
            element.open = true;
          });

        await page
          .locator('glide-core-dropdown-option')
          .first()
          .evaluate<void, GlideCoreDropdownOption>((element) => {
            element.editable = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('multiple=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-dropdown')
          .first()
          .evaluate<void, GlideCoreDropdown>((element) => {
            element.multiple = true;
            element.open = true;
          });

        await page
          .locator('glide-core-dropdown-option')
          .first()
          .evaluate<void, GlideCoreDropdownOption>((element) => {
            element.editable = true;
          });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('globals=theme:dark', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one', 'two']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.multiple = true;
          element.value = ['one', 'two'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('dropdown--with-error', () => {
  test.describe('globals=theme:light', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one', 'two']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.multiple = true;
          element.value = ['one', 'two'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['one', 'two']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.multiple = true;
          element.value = ['one', 'two'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('dropdown--with-icons', () => {
  test.describe('globals=theme:light', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['edit']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['edit'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['edit', 'move']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.multiple = true;
          element.value = ['edit', 'move'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('add-button-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.addButtonLabel = 'Add';
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('filterable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.filterable = true;
        });

      await page.getByRole('combobox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('open', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('select-all', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.selectAll = true;
          element.value = ['one'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['edit']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.open = true;
          element.value = ['edit'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test(`value="['edit', 'move']"`, async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.multiple = true;
          element.open = true;
          element.value = ['edit', 'move'];
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('variant="quiet"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-dropdown')
        .evaluate<void, GlideCoreDropdown>((element) => {
          element.variant = 'quiet';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
