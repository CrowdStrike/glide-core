import { expect, test } from '@playwright/test';

test.describe('Button Group', () => {
  test.describe('Light Mode', () => {
    test.describe('orientation', () => {
      test('horizontal', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--button-group');
        await page.waitForSelector('glide-core-button-group');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('vertical', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--button-group');

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('orientation', () => {
      test('horizontal', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--button-group&globals=theme:dark',
        );

        await page.waitForSelector('glide-core-button-group');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('vertical', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--button-group&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});

test.describe('With Icons', () => {
  test.describe('Light Mode', () => {
    test.describe('horizontal', () => {
      test('', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--with-icons');
        await page.waitForSelector('glide-core-button-group');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('icon-only', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--with-icons');

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.variant = 'icon-only';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('vertical', () => {
      test('', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--with-icons');

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('icon-only', async ({ page }, test) => {
        await page.goto('/iframe.html?id=button-group--with-icons');

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          node.variant = 'icon-only';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });

  test.describe('Dark Mode', () => {
    test.describe('horizontal', () => {
      test('', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--with-icons&globals=theme:dark',
        );

        await page.waitForSelector('glide-core-button-group');
        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('icon-only', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.variant = 'icon-only';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });

    test.describe('vertical', () => {
      test('', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });

      test('icon-only', async ({ page }, test) => {
        await page.goto(
          '/iframe.html?id=button-group--with-icons&globals=theme:dark',
        );

        const handle = await page.waitForSelector('glide-core-button-group');

        await handle.evaluate((node) => {
          node.orientation = 'vertical';
          node.variant = 'icon-only';
          return node.updateComplete;
        });

        await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
      });
    });
  });
});
