import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { preferClosedShadowRoot } from './prefer-shadow-root-mode.js';

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
            'prefer-shadow-root-mode': preferClosedShadowRoot,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/prefer-shadow-root-mode': 'error',
      },
    },
  ],
});

test(
  'valid when `shadowRootOptions` has the correct `mode`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: shadowRootMode,
      };
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when `shadowRootOptions` has extra options with the correct mode',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
        mode: shadowRootMode,
      };
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a class does not extend LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example { }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a class has no `shadowRootOptions`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement { }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      preferClosedShadowRoot.meta.messages.missingShadowRootOptions,
    );
  },
);

test(
  'invalid when a LitElement has no `shadowRootOptions`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      @property label = 'test'
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      preferClosedShadowRoot.meta.messages.missingShadowRootOptions,
    );
  },
);

test(
  'invalid when `shadowRootOptions` is defined, but has no `mode`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      preferClosedShadowRoot.meta.messages.missingMode,
    );
  },
);

test(
  'invalid when existing the `shadowRootOptions` has `delegatesFocus` but no `mode`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      preferClosedShadowRoot.meta.messages.missingMode,
    );
  },
);

test(
  'invalid when `mode` is a hardcoded string instead of `shadowRootMode`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Example extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: 'closed'
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      preferClosedShadowRoot.meta.messages.wrongMode,
    );
  },
);
