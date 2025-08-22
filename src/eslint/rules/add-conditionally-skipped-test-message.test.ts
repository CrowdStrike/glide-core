import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { addConditionallySkippedTestMessage } from './add-conditionally-skipped-test-message.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'add-conditionally-skipped-test-message':
              addConditionallySkippedTestMessage,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/add-conditionally-skipped-test-message':
          'error',
      },
    },
  ],
});

test(
  'valid when skipped conditionally with a message',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
      test('test', ({ browserName }) => {
        test.skip(browserName === 'webkit', 'message')
      });
    `);

    expect(result?.errorCount).toBe(0);
  },
);

test('valid when skipped entirely', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    test.skip('skipped', () => {})
  `);

  expect(result?.errorCount).toBe(0);
});

test(
  'invalid when skipped conditionally without a message',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    test('test', ({ browserName }) => {
      test.skip(browserName === 'webkit')
    });
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      addConditionallySkippedTestMessage.meta.messages
        .addConditionallySkippedTestMessage,
    );
  },
);
