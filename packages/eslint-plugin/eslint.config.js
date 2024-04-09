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
  ...compat.plugins('sort-imports-es6-autofix'),
  eslintConfigPrettier,
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
    },
  },
  {
    files: ['*.js', '*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
