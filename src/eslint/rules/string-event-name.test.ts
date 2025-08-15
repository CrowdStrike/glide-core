import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { stringEventName } from './string-event-name.js';

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
            'string-event-name': stringEventName,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/string-event-name': 'error',
      },
    },
  ],
});

test(
  'valid when an `Event` constructor uses a string literal',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    this.dispatchEvent(new Event('change'));
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a `CustomEvent` constructor uses a string literal',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    this.dispatchEvent(new CustomEvent('change'));
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when an `Event` constructor uses a variable',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    const variable = 'change';
    this.dispatchEvent(new Event(variable));
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      stringEventName.meta.messages.stringEventName,
    );
  },
);

test(
  'invalid when a `CustomEvent` constructor uses a variable',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    const variable = 'change';
    this.dispatchEvent(new CustomEvent(variable));
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      stringEventName.meta.messages.stringEventName,
    );
  },
);
