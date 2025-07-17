import { RuleTester } from '@typescript-eslint/rule-tester';
import { commentMaximumLength } from './comment-maximum-length.js';

const ruleTester = new RuleTester();

ruleTester.run('comment-max-length', commentMaximumLength, {
  valid: [
    {
      code: '// Comment',
    },
    {
      code: '// https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js',
    },
    {
      code: '// 1: https://github.com/import-js/eslint-plugin-import/blob/main/config/recommended.js',
    },
    {
      code: '// eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain, @typescript-eslint/no-non-null-assertion',
    },
    {
      code: `
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
      `,
    },
  ],
  invalid: [
    {
      code: '// Lorem ipsum has been the industry standard for placeholder text ever since the...',
      errors: [{ messageId: 'commentMaximumLength' }],
    },
  ],
});
