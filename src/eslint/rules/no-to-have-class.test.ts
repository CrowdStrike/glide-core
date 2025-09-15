import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { noToHaveClass } from './no-to-have-class.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'no-to-have-class': noToHaveClass,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-to-have-class': 'error',
      },
    },
  ],
});

test(
  'valid when `expeft().toHaveClass()` is not used',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', async ({ page }) => {
        const host = page.locator('glide-core-button');
        await expect(host).toBeVisible();
      });
    `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when `expect().toHaveClass()` is used',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', async ({ page }) => {
        const host = page.locator('glide-core-button');
        await expect(host).toHaveClass('button');
      });
    `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noToHaveClass.meta.messages.noToHaveClass,
    );
  },
);

test(
  'valid when `expect().not.toHaveClass()` is not used',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', async ({ page }) => {
        const host = page.locator('glide-core-button');
        await expect(host).toBeVisible();
      });
    `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when `expect().not.toHaveClass()` is used',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', async ({ page }) => {
        const host = page.locator('glide-core-button');
        await expect(host).not.toHaveClass('button');
      });
    `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noToHaveClass.meta.messages.noToHaveClass,
    );
  },
);
