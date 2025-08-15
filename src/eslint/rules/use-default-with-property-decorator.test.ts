import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { useDefaultWithPropertyDecorator } from './use-default-with-property-decorator.js';

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
            'use-default-with-property-decorator':
              useDefaultWithPropertyDecorator,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/use-default-with-property-decorator': 'error',
      },
    },
  ],
});

test(
  'valid when a class does not extend `LitElement`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component {
      @property({ reflect: true })
      name = "";
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has `useDefault: true`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true, useDefault: true })
      name = "";
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has no default value',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true })
      name: string;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property has `useDefault: false`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ useDefault: false })
      name = "";
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a property does not reflect', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property()
      name = "";
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when a property is a Boolean type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true, type: Boolean })
      disabled = false;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a property is overridden', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true })
      override role = "option";
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when a property has a Number type with `useDefault: true`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true, type: Number, useDefault: true })
      count = -1;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a class is not a component', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Class {
      readonly property = true;
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'invalid when a reflected property has a default value without `useDefault`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true })
      name = "";
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      useDefaultWithPropertyDecorator.meta.messages
        .useDefaultWithPropertyDecorator,
    );
  },
);

test(
  'invalid when a reflected Number property has a negative default value without `useDefault`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @property({ reflect: true, type: Number })
      count = -1;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      useDefaultWithPropertyDecorator.meta.messages
        .useDefaultWithPropertyDecorator,
    );
  },
);
