import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { alwaysTagTests } from './always-tag-tests.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'always-tag-tests': alwaysTagTests,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/always-tag-tests': 'error',
      },
    },
  ],
});

test('valid when tagged', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', { tag: '@eslint' }, () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when not tagged', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', { annotation: { type: 'type' } }, () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    alwaysTagTests.meta.messages.alwaysTagTests,
  );
});
