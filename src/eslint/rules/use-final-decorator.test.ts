import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { useFinalDecorator } from './use-final-decorator.js';
import { expect, test } from '@/src/playwright/test.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      languageOptions: {
        parser,
      },
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'use-final-decorator': useFinalDecorator,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/use-final-decorator': 'error',
      },
    },
  ],
});

test(
  'valid when a component has a `final` decorator after a `customElement` decorator',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    @customElement('glide-core-component')
    @final
    class Component extends LitElement {}
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a component has a `final` decorator before a `customElement` decorator',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    @final
    @customElement('glide-core-component')
    class Component extends LitElement {}
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a class does not extend `LitElement`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Class {}
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a component extends `LitElement` without a `final` decorator',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    @customElement('glide-core-component')
    class Component extends LitElement {}
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      useFinalDecorator.meta.messages.useFinalDecorator,
    );
  },
);
