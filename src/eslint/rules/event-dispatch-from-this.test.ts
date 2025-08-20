import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { eventDispatchFromThis } from './event-dispatch-from-this.js';

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
            'event-dispatch-from-this': eventDispatchFromThis,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/event-dispatch-from-this': 'error',
      },
    },
  ],
});

test(
  'valid when dispatching an event from `this` in a LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      method() {
        this.dispatchEvent(new Event('change'))
      }
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when dispatching an event from an element in a non-LitElement class',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component {
      method() {
        this.element.dispatchEvent(new Event('change'))
      }
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when dispatching an event from an element property in a LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      method() {
        this.element.dispatchEvent(new Event('change'))
      }
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      eventDispatchFromThis.meta.messages.dispatchFromThis,
    );
  },
);

test(
  'invalid when dispatching an event from a DOM query in a LitElement',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class Component extends LitElement {
      method() {
        document.querySelector('input').dispatchEvent(new Event('change'))
      }
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      eventDispatchFromThis.meta.messages.dispatchFromThis,
    );
  },
);
