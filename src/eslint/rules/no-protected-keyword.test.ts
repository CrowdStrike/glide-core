import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { noProtectedKeyword } from './no-protected-keyword.js';

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
            'no-protected-keyword': noProtectedKeyword,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-protected-keyword': 'error',
      },
    },
  ],
});

test('valid when a method is public', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is overridden', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      override method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      private method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a property is public', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      property = true;
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a property is overridden', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      override property = true;
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a property is private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      private property = true;
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a property is readonly', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      readonly property = true;
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid when a method is protected', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      protected method() {}
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    noProtectedKeyword.meta.messages.noProtectedKeyword,
  );
});

test(
  'invalid when a method is protected and overridden',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      protected override method() {}
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noProtectedKeyword.meta.messages.noProtectedKeyword,
    );
  },
);

test('invalid when a property is protected', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      protected property = true;
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    noProtectedKeyword.meta.messages.noProtectedKeyword,
  );
});

test(
  'invalid when a property is protected and overridden',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      protected override property = true;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noProtectedKeyword.meta.messages.noProtectedKeyword,
    );
  },
);

test(
  'invalid when a property is protected and readonly',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      protected readonly property = true;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noProtectedKeyword.meta.messages.noProtectedKeyword,
    );
  },
);
