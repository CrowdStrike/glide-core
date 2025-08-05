import { expect, test } from '@playwright/test';
import type SplitButtonPrimaryButton from './split-button.primary-button.js';
import type SplitButtonPrimaryLink from './split-button.primary-link.js';
import type SplitButtonSecondaryButton from './split-button.secondary-button.js';

test('<glide-core-split-button-primary-button>[disabled=${true}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--split-button');

  await page
    .locator('glide-core-split-button-primary-button')
    .evaluate<void, SplitButtonPrimaryButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - button "Label" [disabled]
    - button "Label"
  `);
});

test('<glide-core-split-button-primary-button>[disabled=${false}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--split-button');
  await page.locator('glide-core-split-button-primary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - button "Label"
    - button "Label"
  `);
});

test('<glide-core-split-button-primary-button>[slot="icon"]', async ({
  page,
}) => {
  await page.goto('?id=split-button--with-icon');
  await page.locator('glide-core-split-button-primary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - button "Label"
    - button "Label"
  `);
});

test('<glide-core-split-button-primary-link>[disabled=${true}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--with-primary-link');

  await page
    .locator('glide-core-split-button-primary-link')
    .evaluate<void, SplitButtonPrimaryLink>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - link "Label" [disabled]
    - button "Label"
  `);
});

test('<glide-core-split-button-primary-link>[disabled=${false}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--with-primary-link');
  await page.locator('glide-core-split-button-primary-link').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - link "Label":
      - /url: /
    - button "Label"
  `);
});

test('<glide-core-split-button-secondary-button>[disabled=${true}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--split-button');

  await page
    .locator('glide-core-split-button-secondary-button')
    .evaluate<void, SplitButtonSecondaryButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - button "Label"
    - button "Label" [disabled]
  `);
});

test('<glide-core-split-button-secondary-button>[disabled=${false}]', async ({
  page,
}) => {
  await page.goto('?id=split-button--split-button');
  await page.locator('glide-core-split-button-secondary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot(`
    - button "Label"
    - button "Label"
  `);
});
