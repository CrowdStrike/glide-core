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

        await page
          .locator('glide-core-checkbox')
          // TODO: add comment here and elsehwere
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

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

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

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

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

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

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${true}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .evaluate<void, GlideCoreCheckbox>((element) => {
            element.checked = true;
          });

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('checked=${false}', async ({ page }, test) => {
        await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

        await page
          .locator('glide-core-checkbox')
          .hover({ position: { x: 0, y: 0 } });

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
