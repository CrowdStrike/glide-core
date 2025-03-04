import { expect, test } from '@playwright/test';

test.describe('Checkbox Group', () => {
  test.describe('Light Mode', () => {
    test.describe('horizontal', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--checkbox-group');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.value = ['one'];
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('horizontal', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--checkbox-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.value = ['one'];
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});

test.describe('With Error', () => {
  test.describe('Light Mode', () => {
    test.describe('horizontal', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto('/iframe.html?id=checkbox-group--with-error');

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.value = ['one'];
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('horizontal', () => {
      test('disabled', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.disabled = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('hide-label', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.hideLabel = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('required', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.required = true;
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('slot="description"', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          const div = document.createElement('div');

          div.textContent = 'Description';
          div.slot = 'description';

          node.append(div);

          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('tooltip', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.tooltip = 'Tooltip';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('value', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=checkbox-group--with-error&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-checkbox-group');

        await handle.evaluate((node) => {
          node.value = ['one'];
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});
