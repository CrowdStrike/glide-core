import { expect, test } from '@playwright/test';
import type GlideCoreInput from './input.js';

test.describe('input--input', () => {
  test.describe('globals=theme:light', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('input--with-error', () => {
  test.describe('globals=theme:light', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('input--with-icons', () => {
  test.describe('globals=theme:light', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('globals=theme:dark', () => {
    test('clearable', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.clearable = true;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('disabled', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.disabled = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('hide-label', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.hideLabel = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('max-length', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.maxlength = 1;
        });

      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('orientation="vertical"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.orientation = 'vertical';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('password-toggle', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.passwordToggle = true;
          element.type = 'password';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('placeholder', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.placeholder = 'Placeholder';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('readonly', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.readonly = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('required', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.required = true;
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('tooltip', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.tooltip = 'Tooltip';
        });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="date"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'date';
        });

      await page.getByRole('textbox').fill('2009-01-03');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="search"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'search';
        });

      await page.getByRole('searchbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="text"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);
      await page.locator('glide-core-input').waitFor();
      await page.getByRole('textbox').fill('Test');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('type="time"', async ({ page }, test) => {
      await page.goto(`?id=${test.titlePath.at(1)}&${test.titlePath.at(2)}`);

      await page
        .locator('glide-core-input')
        .evaluate<void, GlideCoreInput>((element) => {
          element.type = 'time';
        });

      await page.getByRole('textbox').fill('00:00');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
