import { expect, test as it } from '@playwright/test';

it('renders a primary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--primary&viewMode=story');

  await expect(page).toHaveScreenshot(['button.test.regression.primary.png']);
});

it('renders a disabled primary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=disabled:!true&id=button--primary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.disabled.png',
  ]);
});

it('renders a small primary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=size:small&id=button--primary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.small.png',
  ]);
});

it('renders a hovered primary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--primary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.hover('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.hover.png',
  ]);
});

it('renders a focused primary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--primary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.focus('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.focus.png',
  ]);
});

it('renders a primary button with a prefix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--primary-with-prefix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.prefix.png',
  ]);
});

it('renders a primary button with a suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--primary-with-suffix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.suffix.png',
  ]);
});

it('renders a primary button with a prefix and suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--primary-with-prefix-and-suffix-icons&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.primary.prefix-and-suffix.png',
  ]);
});

it('renders a secondary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--secondary&viewMode=story');

  await expect(page).toHaveScreenshot(['button.test.regression.secondary.png']);
});

it('renders a disabled secondary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=disabled:!true&id=button--secondary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.disabled.png',
  ]);
});

it('renders a small secondary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=size:small&id=button--secondary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.small.png',
  ]);
});

it('renders a hovered secondary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--secondary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.hover('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.hover.png',
  ]);
});

it('renders a focused secondary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--secondary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.focus('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.focus.png',
  ]);
});

it('renders a secondary button with a prefix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--secondary-with-prefix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.prefix.png',
  ]);
});

it('renders a secondary button with a suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--secondary-with-suffix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.suffix.png',
  ]);
});

it('renders a secondary button with a prefix and suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--secondary-with-prefix-and-suffix-icons&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.secondary.prefix-and-suffix.png',
  ]);
});

it('renders a tertiary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--tertiary&viewMode=story');

  await expect(page).toHaveScreenshot(['button.test.regression.tertiary.png']);
});

it('renders a disabled tertiary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=disabled:!true&id=button--tertiary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.disabled.png',
  ]);
});

it('renders a small tertiary button', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=size:small&id=button--tertiary&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.small.png',
  ]);
});

it('renders a hovered tertiary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--tertiary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.hover('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.hover.png',
  ]);
});

it('renders a focused tertiary button', async ({ page }) => {
  await page.goto('/iframe.html?args=&id=button--tertiary&viewMode=story');

  await page.waitForSelector('glide-core-button');

  await page.focus('glide-core-button');

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.focus.png',
  ]);
});

it('renders a tertiary button with a prefix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--tertiary-with-prefix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.prefix.png',
  ]);
});

it('renders a tertiary button with a suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--tertiary-with-suffix-icon&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.suffix.png',
  ]);
});

it('renders a tertiary button with a prefix and suffix', async ({ page }) => {
  await page.goto(
    '/iframe.html?args=&id=button--tertiary-with-prefix-and-suffix-icons&viewMode=story',
  );

  await expect(page).toHaveScreenshot([
    'button.test.regression.tertiary.prefix-and-suffix.png',
  ]);
});
