import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { noRedudantPropertyAttribute } from './no-redundant-property-attribute.js';
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
            'no-redundant-property-attribute': noRedudantPropertyAttribute,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-redundant-property-attribute': 'error',
      },
    },
  ],
});

test(
  'valid when a class does not extend LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent { @property({ attribute: "name" }) name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has no `attribute` specified',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property() name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has options specified',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ reflect: true }) name = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when an `attribute` name differs from the property name',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ attribute: "name1" }) name2 = "test" }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when an `attribute` matches the property name',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ attribute: "name" }) name = "test" }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noRedudantPropertyAttribute.meta.messages.noRedudantPropertyAttribute,
    );
  },
);

test(
  'invalid when an `attribute` matches the property name with additional property options',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement { @property({ attribute: "name", reflect: true, type: Boolean }) name = "test" }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noRedudantPropertyAttribute.meta.messages.noRedudantPropertyAttribute,
    );
  },
);
