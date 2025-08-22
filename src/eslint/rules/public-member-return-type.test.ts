import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { publicMemberReturnType } from './public-member-return-type.js';
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
            'public-member-return-type': publicMemberReturnType,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/public-member-return-type': 'error',
      },
    },
  ],
});

test(
  'valid when a method has an explicit return type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      method(): boolean {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a method is a private identifier',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      #method() {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a method is private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      private method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is pseudo-private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      privateMethod() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is a constructor', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      constructor() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is overridden', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      override method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a method is a setter', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      set property() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when a class does not extend LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends Element {
      method() {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a class has no superclass', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      method() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'invalid when a public method has no return type annotation',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      method() {}
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicMemberReturnType.meta.messages.addReturnType,
    );
  },
);
