import { expect, test } from '@playwright/test';
import type GlideCoreTextarea from './textarea.js';

test.describe('textarea--textarea', () => {
  test.describe('globals=theme:light', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
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
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.value = 'Value';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
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
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.value = 'Value';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('textarea--with-error', () => {
  test.describe('globals=theme:light', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
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
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.value = 'Value';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('slot="description"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
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
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('value', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-textarea')
        .evaluate<void, GlideCoreTextarea>((element) => {
          element.value = 'Value';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
