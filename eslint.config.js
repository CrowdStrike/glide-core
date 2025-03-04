import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';
import sortClassMembers from 'eslint-plugin-sort-class-members';
import stylistic from '@stylistic/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import typescript from 'typescript-eslint';
import unicorn from 'eslint-plugin-unicorn';
import glideCore from './dist/eslint/plugin.js';

const compat = new FlatCompat();

export default [
  eslint.configs.recommended,
  unicorn.configs['flat/all'],
  sortClassMembers.configs['flat/recommended'],
  importPlugin.flatConfigs.recommended,
  ...compat.extends('plugin:lit/recommended'),
  ...compat.extends('plugin:lit-a11y/recommended'),
  ...typescript.configs.recommendedTypeChecked,
  ...typescript.configs.stylisticTypeChecked,
  prettier,
  {
    ignores: ['dist'],
  },
  {
    plugins: {
      '@stylistic': stylistic,
      '@crowdstrike/glide-core': glideCore,
    },
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      '@crowdstrike/glide-core/consistent-reference-element-declarations':
        'error',
      '@crowdstrike/glide-core/no-glide-core-prefixed-event-name': 'error',
      '@crowdstrike/glide-core/no-nested-template-literals': 'error',
      '@crowdstrike/glide-core/no-redundant-property-attribute': 'error',
      '@crowdstrike/glide-core/no-redundant-property-string-type': 'error',
      '@crowdstrike/glide-core/no-space-press': 'error',
      '@crowdstrike/glide-core/prefer-shadow-root-mode': 'error',
      '@crowdstrike/glide-core/prefixed-lit-element-class-declaration': 'error',
      '@crowdstrike/glide-core/public-member-return-type': 'error',
      '@crowdstrike/glide-core/public-getter-default-comment': 'error',
      '@crowdstrike/glide-core/event-dispatch-from-this': 'error',
      '@crowdstrike/glide-core/string-event-name': 'error',
      '@crowdstrike/glide-core/slot-type-comment': 'error',
      '@crowdstrike/glide-core/public-property-expression-type': 'error',

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

      eqeqeq: 'error',

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
      'import/order': 'error',

      // TypeScript handles these for us. Plus they're a bear to configure.
      'import/named': 'off',
      'import/no-unresolved': 'off',

      // It sometimes helps readability to do a default import and call methods
      // off it. Plus this rule isn't autofixable. So we'd have to make a ton
      // of manual changes.
      'import/no-named-as-default-member': 'off',

      // We use Lit's `classMap` often enough that disabling this rule ad hoc
      // became tiresome.
      'unicorn/no-keyword-prefix': 'off',

      // We understand Unicorn's justification for this but found it hurts
      // readability more than it helps searchability.
      //
      // https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/docs/rules/no-anonymous-default-export.md
      'unicorn/no-anonymous-default-export': 'off',

      // https://github.com/CrowdStrike/glide-core/pull/551#discussion_r1892759742
      'unicorn/prefer-global-this': 'off',

      'no-restricted-imports': [
        'error',
        {
          paths: [
            // See CONTRIBUTING.md for detailed reasoning
            {
              name: 'lit/decorators.js',
              importNames: [
                'query',
                'queryAll',
                'queryAsync',
                'queryAssignedElements',
                'queryAssignedNodes',
              ],
              message:
                'Please use a Lit `ref`, `this.querySelector()`, or `this.querySelectorAll()` instead of a query decorator.',
            },
            // According to https://github.com/lit/lit?tab=readme-ov-file#packages,
            // we should be importing everything from lit rather than lit-html/lit-element.
            {
              name: 'lit-html',
              message: "Please import from 'lit' rather than 'lit-html'.",
            },
            {
              name: 'lit-element',
              message: "Please import from 'lit' rather than 'lit-element'.",
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          // See CONTRIBUTING.md for our reasoning.
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
    files: [
      '*.ts',
      'src/*.test.ts',
      'src/*.test.*.ts',
      'src/*.*.test.*.ts',
      '.storybook/**/*',
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    files: ['*.js', '.storybook/**/*'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ['src/figma/*.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: [
      '**/*.js',
      'src/**/*.test.ts',
      'src/*.test.*.ts',
      'src/*.*.test.*.ts',
    ],
    // These rules don't apply to JavaScript. And for tests they're annoying
    // due to how much of Chai or "@open-wc/testing" is typed as `any` or
    // inconsistently. `expect`, for example, results sometimes in a promise
    // and other times something else depending on what it's chained with.
    ...typescript.configs.disableTypeChecked,
  },
  {
    files: ['src/**/*.test.ts', 'src/*.test.*.ts', 'src/*.*.test.*.ts'],
    rules: {
      // This rule isn't disabled by `disableTypeChecked` but frequently produces
      // an error in our tests, seemingly due to how Chai is typed.
      '@typescript-eslint/no-unused-expressions': 'off',

      // One-off components in tests can do whatever they need to with their shadow
      // roots. Though most will stick with Lit's default, which is open.
      '@crowdstrike/glide-core/prefer-shadow-root-mode': 'off',

      '@crowdstrike/glide-core/consistent-test-fixture-variable-declarator':
        'error',
      '@crowdstrike/glide-core/no-only-tests': 'error',
      '@crowdstrike/glide-core/no-skip-tests': 'error',
      '@crowdstrike/glide-core/no-to-have-attribute': 'error',
      '@crowdstrike/glide-core/prefer-to-be-true-or-false': 'error',
      '@crowdstrike/glide-core/public-member-return-type': 'off',
      '@crowdstrike/glide-core/public-getter-default-comment': 'off',
      '@crowdstrike/glide-core/event-dispatch-from-this': 'off',
      '@crowdstrike/glide-core/string-event-name': 'off',
      '@crowdstrike/glide-core/slot-type-comment': 'off',
      '@crowdstrike/glide-core/public-property-expression-type': 'off',
    },
  },
  {
    files: ['src/library/**'],
    rules: {
      '@crowdstrike/glide-core/public-member-return-type': 'off',
      '@crowdstrike/glide-core/public-getter-default-comment': 'off',
    },
  },
];
