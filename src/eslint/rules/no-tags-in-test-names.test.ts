import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { noTagsInTestNames } from './no-tags-in-test-names.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'no-tags-in-test-names': noTagsInTestNames,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-tags-in-test-names': 'error',
      },
    },
  ],
});

test(
  'valid when the test name does not include a tag',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
     test('registers itself', () => {});
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when the test name includes a tag',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
     test('registers itself @miscellaneous', () => {});
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noTagsInTestNames.meta.messages.noTagsInTestNames,
    );
  },
);
