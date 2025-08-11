import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { noToContainClass } from './no-to-contain-class.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'no-to-contain-class': noToContainClass,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-to-contain-class': 'error',
      },
    },
  ],
});

test(
  'valid when `toContainClass()` is not used',
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
  'invalid when `toContainClass()` is used',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', async ({ page }) => {
        const host = page.locator('glide-core-button');
        await expect(host).toContainClass('button');
      });
    `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noToContainClass.meta.messages.noToContainClass,
    );
  },
);
