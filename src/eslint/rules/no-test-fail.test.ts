import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { noTestFail } from './no-test-fail.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'no-test-fail': noTestFail,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-test-fail': 'error',
      },
    },
  ],
});

test('valid when `test.fail()` is not used', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('registers itself', () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when not tagged', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test.fail('registers itself', () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    noTestFail.meta.messages.noTestFail,
  );
});
