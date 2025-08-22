import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { oneTagPerTest } from './one-tag-per-test.js';
import { expect, test } from '@/src/playwright/test.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'one-tag-per-test': oneTagPerTest,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/one-tag-per-test': 'error',
      },
    },
  ],
});

test('valid when only one tag is present', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', { tag: '@eslint' }, () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when multiple tags are present', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', { tag: ['@eslint', '@stylelint'] }, () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    oneTagPerTest.meta.messages.oneTagPerTest,
  );
});

test('invalid when `tag` is an array', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', { tag: ['@eslint'] }, () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    oneTagPerTest.meta.messages.unnecessaryArray,
  );
});
