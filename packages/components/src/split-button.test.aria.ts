import { expect, test } from '@playwright/test';
import type GlideCoreSplitButtonPrimaryButton from './split-button.primary-button.js';
import type GlideCoreSplitButtonPrimaryLink from './split-button.primary-link.js';
import type GlideCoreSplitButtonSecondaryButton from './split-button.secondary-button.js';

test('<glide-core-split-button-primary-button>[disabled=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--split-button');

  await page
    .locator('glide-core-split-button-primary-button')
    .evaluate<void, GlideCoreSplitButtonPrimaryButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-primary-button>[disabled=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--split-button');
  await page.locator('glide-core-split-button-primary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-primary-button>[slot="icon"]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--with-icon');
  await page.locator('glide-core-split-button-primary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-primary-link>[disabled=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--with-primary-link');

  await page
    .locator('glide-core-split-button-primary-link')
    .evaluate<void, GlideCoreSplitButtonPrimaryLink>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-primary-link>[disabled=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--with-primary-link');
  await page.locator('glide-core-split-button-primary-link').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-secondary-button>[disabled=${true}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--split-button');

  await page
    .locator('glide-core-split-button-secondary-button')
    .evaluate<void, GlideCoreSplitButtonSecondaryButton>((element) => {
      element.disabled = true;
    });

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});

test('<glide-core-split-button-secondary-button>[disabled=${false}]', async ({
  page,
}, test) => {
  await page.goto('?id=split-button--split-button');
  await page.locator('glide-core-split-button-secondary-button').waitFor();

  await expect(page.locator('glide-core-split-button')).toMatchAriaSnapshot({
    name: `${test.titlePath.join('.')}.yml`,
  });
});
