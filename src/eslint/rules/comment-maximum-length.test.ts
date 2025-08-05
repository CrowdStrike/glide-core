import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { commentMaximumLength } from './comment-maximum-length.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'comment-maximum-length': commentMaximumLength,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/comment-maximum-length': 'error',
      },
    },
  ],
});

test('valid when short', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    // Short
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a long URL', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    // https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a long superscripted URL', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    // 1: https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when disabling multiple lint rules',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      // eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion',
    `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a block comment', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    /**
     * @attr {string} label
     * @attr {string|null} [aria-description=null]
     * @attr {boolean} [disabled=false]
     * @attr {string} [name='']
     * @attr {'large'|'small'} [size='large']
     * @attr {string} [tooltip]
     * @attr {'button'|'submit'|'reset'} [type='button']
     * @attr {string} [value='']
     * @attr {'primary'|'secondary'|'tertiary'} [variant='primary']
     *
     * @readonly
     * @attr {string} [version]
     *
     * @slot {Element} [prefix-icon] - An icon before the label
     * @slot {Element} [suffix-icon] - An icon after the label
     *
     * @readonly
     * @prop {HTMLFormElement | null} form
     */
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when long', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    // Lorem ipsum has been the industry standard for placeholder text ever since the...'
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    commentMaximumLength.meta.messages.commentMaximumLength,
  );
});
