import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { testTagMatchesSuite } from './test-tag-matches-suite.js';
import { expect, test } from '@/src/playwright/test.js';

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

test('valid when the tag matches the suite', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    test('test', { tag: '@eslint' }, () => {});
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'invalid when the tag does not match the suite',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', { tag: '@mouse' }, () => {});
    `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      // A raw string because the message is interpolated.
      `A test's tag should reflect the name of its suite. "@mouse" should be "@eslint".`,
    );
  },
);
