import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { noTestFixme } from './no-test-fixme.js';
import { expect, test } from '@/src/playwright/test.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'no-test-fixme': noTestFixme,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-test-fixme': 'error',
      },
    },
  ],
});

test('valid when `test.fixme()` is not used', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('test', () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when `test.fixme()` is used', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test.fixme('test', () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    noTestFixme.meta.messages.noTestFixme,
  );
});
