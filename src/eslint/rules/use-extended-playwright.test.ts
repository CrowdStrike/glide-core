import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { useExtendedPlaywright } from './use-extended-playwright.js';

const eslint = new ESLint({
  overrideConfigFile: true,
  overrideConfig: [
    {
      plugins: {
        '@crowdstrike/glide-core': {
          rules: {
            'use-extended-playwright': useExtendedPlaywright,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/use-extended-playwright': 'error',
      },
    },
  ],
});

test('valid', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    import { expect, test } from './playwright/test.js';
  `);

  expect(result?.errorCount).toBe(0);
});

test('invalid', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    import { expect, test } from '@playwright/test';
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    useExtendedPlaywright.meta.messages.useExtendedPlaywright,
  );
});
