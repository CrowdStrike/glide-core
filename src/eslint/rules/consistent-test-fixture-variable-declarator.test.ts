import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { expect, test } from '../../playwright/test.js';
import { consistentTestFixtureVariableDeclarator } from './consistent-test-fixture-variable-declarator.js';

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
            'consistent-test-fixture-variable-declarator':
              consistentTestFixtureVariableDeclarator,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/consistent-test-fixture-variable-declarator':
          'error',
      },
    },
  ],
});

test(
  'valid when the variable is not a fixture',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    const notAFixture = html\`\`;
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when declaring `host` as the fixture variable declaration',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    const host = await fixture(html\`\`);
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when not using `host` as the fixture variable declaration',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    const notComponent = await fixture(html\`\`);
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      consistentTestFixtureVariableDeclarator.meta.messages.consistentNaming,
    );
  },
);
