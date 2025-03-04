import { expect, test } from '@playwright/test';

test.describe('Accordion', () => {
  test.describe('Light Mode', () => {
    test('open', async ({ page }, test) => {
      await page.goto('/iframe.html?id=accordion--accordion');

      const handle = await page.waitForSelector('glide-core-accordion');

      await handle?.evaluate((node) => {
        node.open = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('closed', async ({ page }, test) => {
      await page.goto('/iframe.html?id=accordion--accordion');
      await page.waitForSelector('glide-core-accordion');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('Dark Mode', () => {
    test('open', async ({ page }, test) => {
      await page.goto(
        '/iframe.html?id=accordion--accordion&globals=theme:dark',
      );

      const handle = await page.waitForSelector('glide-core-accordion');

      await handle?.evaluate((node) => {
        node.open = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('closed', async ({ page }, test) => {
      await page.goto(
        '/iframe.html?id=accordion--accordion&globals=theme:dark',
      );

      await page.waitForSelector('glide-core-accordion');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});

test.describe('With Icons', () => {
  test.describe('Light Mode', () => {
    test('open', async ({ page }, test) => {
      await page.goto('/iframe.html?id=accordion--with-icons');

      const handle = await page.waitForSelector('glide-core-accordion');

      await handle?.evaluate((node) => {
        node.open = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('closed', async ({ page }, test) => {
      await page.goto('/iframe.html?id=accordion--with-icons');
      await page.waitForSelector('glide-core-accordion');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });

  test.describe('Dark Mode', () => {
    test('open', async ({ page }, test) => {
      await page.goto(
        '/iframe.html?id=accordion--with-icons&globals=theme:dark',
      );

      const handle = await page.waitForSelector('glide-core-accordion');

      await handle?.evaluate((node) => {
        node.open = true;
        return node.updateComplete;
      });

      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });

    test('closed', async ({ page }, test) => {
      await page.goto(
        '/iframe.html?id=accordion--with-icons&globals=theme:dark',
      );

      await page.waitForSelector('glide-core-accordion');
      await expect(page).toHaveScreenshot(`${test.titlePath.join('.')}.png`);
    });
  });
});
