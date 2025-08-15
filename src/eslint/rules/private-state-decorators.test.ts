import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { privateStateDecorators } from './private-state-decorators.js';

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
            'private-state-decorators': privateStateDecorators,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/private-state-decorators': 'error',
      },
    },
  ],
});

test(
  'valid when a state-decorated property is private',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @state()
      private open = true;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a state-decorated property is private and readonly',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @state()
      private readonly open = true;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a state-decorated property is public',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @state()
      open = true;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      privateStateDecorators.meta.messages.privateStateDecorators,
    );
  },
);

test(
  'invalid when a state-decorated property is readonly but not private',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      @state()
      readonly open = true;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      privateStateDecorators.meta.messages.privateStateDecorators,
    );
  },
);
