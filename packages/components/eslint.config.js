import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintGlideCorePlugin from '@crowdstrike/glide-core-eslint-plugin';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import globals from 'globals';
import js from '@eslint/js';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import stylistic from '@stylistic/eslint-plugin';
import typescriptEslint from 'typescript-eslint';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  eslintPluginUnicorn.configs['flat/all'],
  sortClassMembers.configs['flat/recommended'],
  ...compat.extends('plugin:lit/recommended'),
  ...compat.extends('plugin:lit-a11y/recommended'),
  ...compat.plugins('sort-imports-es6-autofix'),
  ...typescriptEslint.configs.recommendedTypeChecked,
  ...typescriptEslint.configs.stylisticTypeChecked,
  eslintConfigPrettier,
  {
    ignores: ['dist'],
  },
  {
    plugins: {
      '@stylistic': stylistic,
      '@crowdstrike/glide-core-eslint-plugin': eslintGlideCorePlugin,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@crowdstrike/glide-core-eslint-plugin/consistent-reference-element-declarations':
        'error',
      '@crowdstrike/glide-core-eslint-plugin/no-cs-prefixed-event-name':
        'error',
      '@crowdstrike/glide-core-eslint-plugin/prefer-closed-shadow-root':
        'error',
      '@crowdstrike/glide-core-eslint-plugin/prefixed-lit-element-class-declaration':
        'error',

      // Enabling this rule would force us to `await` any function that returns a promise.
      // One example is a function that itself `await`s `updateComplete`. The rule is a bit
      // cumbersome in practice.
      '@typescript-eslint/no-floating-promises': 'off',

      // Most of the methods this rule would cover are bound by Lit.
      '@typescript-eslint/unbound-method': 'off',

      '@stylistic/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-block-like',
        },
        {
          blankLine: 'always',
          prev: 'multiline-block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-const',
        },
        {
          blankLine: 'always',
          prev: 'multiline-const',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-expression',
        },
        {
          blankLine: 'always',
          prev: 'multiline-expression',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-let',
        },
        {
          blankLine: 'always',
          prev: 'multiline-let',
          next: '*',
        },
        {
          blankLine: 'never',
          prev: 'case',
          next: 'case',
        },
      ],
      '@stylistic/lines-between-class-members': [
        'error',
        'always',
        { exceptAfterSingleLine: false },
      ],

      // We work with the DOM enough that this rule also became tiresome.
      'unicorn/no-null': 'off',

      // We want to steer people toward using real member privacy.
      'no-underscore-dangle': [
        'error',
        { enforceInClassFields: true, enforceInMethodNames: true },
      ],

      'prefer-const': 'error',
      'no-implicit-coercion': 'error',
      'no-console': 'error',
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
      'sort-class-members/sort-class-members': [
        2,
        {
          order: [
            '[public-static-properties]',
            '[public-@property]',
            '[public-@state]',
            '[public-properties]',
            '[public-accessors]',
            '[public-arrow-function-expressions]',
            '[public-methods]',
            '[public-static-methods]',

            'constructor',

            '[private-static-properties]',
            '[private-@state]',
            '[private-properties]',
            '[private-accessors]',
            '[private-arrow-function-expressions]',
            '[private-methods]',
          ],
          accessorPairPositioning: 'getThenSet',
          groups: {
            'public-static-properties': [
              { type: 'property', sort: 'alphabetical', static: true },
            ],
            'public-@property': [
              {
                groupByDecorator: '/property/',
                sort: 'alphabetical',
              },
            ],
            'public-@state': [
              {
                groupByDecorator: '/state/',
                sort: 'alphabetical',
              },
            ],
            'public-properties': [{ type: 'property', sort: 'alphabetical' }],
            'public-accessors': [{ kind: 'accessor' }],
            'public-methods': [{ type: 'method', sort: 'alphabetical' }],
            'public-arrow-function-expressions': [
              {
                type: 'property',
                propertyType: 'ArrowFunctionExpression',
                sort: 'alphabetical',
              },
            ],
            'public-static-methods': [
              { type: 'method', sort: 'alphabetical', static: true },
            ],
            'private-@state': [
              {
                type: 'property',
                groupByDecorator: '/state/',
                accessibility: 'private',
                sort: 'alphabetical',
              },
            ],
            'private-properties': [
              { type: 'property', private: true, sort: 'alphabetical' },
            ],
            'private-accessors': [{ kind: 'accessor', private: true }],
            'private-arrow-function-expressions': [
              {
                type: 'property',
                private: true,
                propertyType: 'ArrowFunctionExpression',
                sort: 'alphabetical',
              },
            ],
            'private-methods': [
              { type: 'method', private: true, sort: 'alphabetical' },
            ],
          },
        },
      ],
    },
  },
  {
    files: ['*.js', '*.ts', '**/*.test.ts', '.storybook/**/*'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['**/*.js', '**/*.test.*ts'],
    // These rules don't apply to JavaScript. And for tests they're annoying
    // due to how much of "@open-wc/testing" is typed as `any` or inconsistently.
    // `expect`, for example, results sometimes in a promise and other times something
    // else depending on what it's chained with.
    ...typescriptEslint.configs.disableTypeChecked,
  },
];
