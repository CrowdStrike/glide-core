import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { publicGetterDefaultComment } from './public-getter-default-comment.js';

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
            'public-getter-default-comment': publicGetterDefaultComment,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/public-getter-default-comment': 'error',
      },
    },
  ],
});

test(
  'valid when a getter has a JSDoc comment with a default tag',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      /**
       * @default {string}
       */
      get property() {}
      set property() {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a getter is a private identifier',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      get #property() {}
      set #property() {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when a getter is private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      private get property() {}
      private set property() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a getter is pseudo-private', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      get privateProperty() {}
      set privateProperty() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test('valid when a getter is overridden', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      override get property() {}
      override set property() {}
    }
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'valid when a getter is overridden without a setter',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      override get property() {}
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a getter has a comment but no default tag',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      /**
       * Description
       */
      get property() {}
      set property() {}
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicGetterDefaultComment.meta.messages.addDefaultTag,
    );
  },
);

test('invalid when a getter has no comment', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      get property() {}
      set property() {}
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    publicGetterDefaultComment.meta.messages.addCommentAndDefaultTag,
  );
});

test(
  'invalid when a getter uses a block comment instead of JSDoc',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      /*
       * @default {string}
       */
      get property() {}
      set property() {}
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicGetterDefaultComment.meta.messages.useJsDocComment,
    );
  },
);
