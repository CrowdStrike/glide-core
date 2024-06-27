import { expect, test } from '@playwright/test';

// Items to figure out still:
// 1) Is there a way to query storybook for the stories?
// 2) How should we interact with components here?

test('button--primary', async ({ page }) => {
  await page.goto('?path=/story/button--primary');

  await expect(page).toHaveScreenshot(
    'button.test.regression.button--primary.png',
  );
});

// test('button--primary-with-prefix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--primary-with-prefix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--primary-with-suffix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--primary-with-suffix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--primary-with-prefix-and-suffix-icons', async ({ page }) => {
//   await page.goto('?path=/story/button--primary-with-prefix-and-suffix-icons');
//   await expect(page).toHaveScreenshot();
// });

// test('button--secondary', async ({ page }) => {
//   await page.goto('?path=/story/button--secondary');
//   await expect(page).toHaveScreenshot();
// });

// test('button--secondary-with-prefix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--secondary-with-prefix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--secondary-with-suffix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--secondary-with-suffix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--secondary-with-prefix-and-suffix-icons', async ({ page }) => {
//   await page.goto(
//     '?path=/story/button--secondary-with-prefix-and-suffix-icons',
//   );

//   await expect(page).toHaveScreenshot();
// });

// test('button--tertiary', async ({ page }) => {
//   await page.goto('?path=/story/button--tertiary');
//   await expect(page).toHaveScreenshot();
// });

// test('button--tertiary-with-prefix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--tertiary-with-prefix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--tertiary-with-suffix-icon', async ({ page }) => {
//   await page.goto('?path=/story/button--tertiary-with-suffix-icon');
//   await expect(page).toHaveScreenshot();
// });

// test('button--tertiary-with-prefix-and-suffix-icons', async ({ page }) => {
//   await page.goto('?path=/story/button--tertiary-with-prefix-and-suffix-icons');
//   await expect(page).toHaveScreenshot();
// });
