import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { noRedudantPropertyStringType } from './no-redundant-property-string-type.js';
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
            'no-redundant-property-string-type': noRedudantPropertyStringType,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-redundant-property-string-type': 'error',
      },
    },
  ],
});

test(
  'valid when a class does not extend LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent { @property({ type: String }) name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has no `type` specified',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property() name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has only a `reflect` option',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a property has a `type`', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ type: Boolean }) name = false }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when a property has a type with an `attribute`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ attribute: "some-name", type: Boolean }) name = false }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a property has a redundant String `type` only',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ type: String }) name = "test" }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noRedudantPropertyStringType.meta.messages.noRedudantPropertyStringType,
    );
  },
);

test(
  'invalid when a property has a String type with `reflect`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ type: String, reflect: true }) name = "test" }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noRedudantPropertyStringType.meta.messages.noRedudantPropertyStringType,
    );
  },
);

test(
  'invalid when a property has a String type with `attribute` and `reflect`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ attribute: "some-name", type: String, reflect: true }) name = "test" }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noRedudantPropertyStringType.meta.messages.noRedudantPropertyStringType,
    );
  },
);
