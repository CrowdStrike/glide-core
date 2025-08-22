import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { conditionallyOpenShadowRoots } from './conditionally-open-shadow-roots.js';

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
            'conditionally-open-shadow-roots': conditionallyOpenShadowRoots,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/conditionally-open-shadow-roots': 'error',
      },
    },
  ],
});

test(
  'valid when the shadow root is conditionally open',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: window.navigator.webdriver ? 'open' : 'closed',
      };
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when the shadow root is conditionally open and other shadow root options are present',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        delegatesFocus: true,
         mode: window.navigator.webdriver ? 'open' : 'closed',
      };
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when not a component', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Class {}
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'invalid when there are no shadow root options',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {}
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      conditionallyOpenShadowRoots.meta.messages.noShadowRootOptions,
    );
  },
);

test(
  'invalid when there are shadow root options but no mode',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      conditionallyOpenShadowRoots.meta.messages.noMode,
    );
  },
);

test(
  'invalid when the shadow root is not open for tests',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: window.navigator.webdriver ? 'closed' : 'open',
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      conditionallyOpenShadowRoots.meta.messages.wrongMode,
    );
  },
);

test(
  'invalid when the shadow root not closed outside of tests',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: window.navigator.webdriver ? 'closed' : 'open',
      };
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      conditionallyOpenShadowRoots.meta.messages.wrongMode,
    );
  },
);

test('invalid when the mode is always open', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: 'open'
      };
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    conditionallyOpenShadowRoots.meta.messages.wrongMode,
  );
});

test('invalid when the mode is always closed', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    class Component extends LitElement {
      static override shadowRootOptions: ShadowRootInit = {
        ...LitElement.shadowRootOptions,
        mode: 'closed'
      };
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    conditionallyOpenShadowRoots.meta.messages.wrongMode,
  );
});
