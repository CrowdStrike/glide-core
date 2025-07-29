import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { testTagMatchesSuite } from './test-tag-matches-suite.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'suite-matching-test-tag': testTagMatchesSuite,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/suite-matching-test-tag': 'error',
      },
    },
  ],
});

test('valid when only one tag is present', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('registers itself', { tag: '@eslint' }, () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when multiple tags are present', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
     test('registers itself', { tag: '@mouse' }, () => {});
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    // A raw string because the message name is interpolated.
    `A test's tag should reflect the name of its suite. "@mouse" should be "@eslint".`,
  );
});
