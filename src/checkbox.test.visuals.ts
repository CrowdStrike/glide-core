import { expect, test } from '@playwright/test';
import type GlideCoreCheckbox from './checkbox.js';

test.describe('checkbox--checkbox', () => {
  test.describe('globals=theme:light', () => {
    test('checked', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.checked = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.disabled = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.indeterminate = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.summary = 'Summary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('checked', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.checked = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.disabled = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.indeterminate = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.summary = 'Summary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('checkbox--with-error', () => {
  test.describe('globals=theme:light', () => {
    test('checked', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.checked = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.disabled = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.indeterminate = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.summary = 'Summary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('checked', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.checked = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test.describe('hover', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.disabled = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        // We hover the input field instead of the host because the host is made
        // to fill the width of the viewport by Label. So most of the host's width
        // is empty space that's unresponsive to hover.
        await page.locator('glide-core-checkbox').getByRole('checkbox').hover();

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test('indeterminate', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.indeterminate = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          element.append(div);
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('summary', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.summary = 'Summary';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-checkbox')
        .evaluate<void, GlideCoreCheckbox>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
