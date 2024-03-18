import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import js from '@eslint/js';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  eslintPluginUnicorn.configs['flat/all'],
  ...compat.extends('plugin:@typescript-eslint/recommended'),
  ...compat.extends('plugin:lit/recommended'),
  ...compat.extends('plugin:lit-a11y/recommended'),
  ...compat.plugins('sort-imports-es6-autofix'),
  eslintConfigPrettier,
  {
    ignores: ['dist'],
  },
  {
    rules: {
      'prefer-const': 'error',
      'sort-imports-es6-autofix/sort-imports-es6': [
        2,
        {
          ignoreCase: false,
          ignoreMemberSort: false,
          memberSyntaxSortOrder: ['none', 'all', 'multiple', 'single'],
        },
      ],
      // We use Lit's `classMap` often enough that disabling this rule ad hoc
      // became tiresome.
      'unicorn/no-keyword-prefix': 'off',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            // See CONTRIBUTING.md for detailed reasoning
            {
              name: 'lit/decorators.js',
              importNames: ['query'],
              message: `Please use a Lit 'ref' instead of 'query'.`,
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          // See CONTRIBUTING.md for detailed reasoning
          selector: `CallExpression[callee.name='describe']`,
          message:
            "Please use separate files rather than the 'describe' block.",
        },
      ],
    },
  },
  {
    files: ['*.js', '*.ts', '**/*.test.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.test.ts', '**/*.test.*.ts'],
    rules: {
      // `null` is commonly used as a value in DOM APIs, which tests often test.
      'unicorn/no-null': 'off',
    },
  },
];
