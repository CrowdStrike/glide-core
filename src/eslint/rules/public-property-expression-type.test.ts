import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { publicPropertyExpressionType } from './public-property-expression-type.js';
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
            'public-property-expression-type': publicPropertyExpressionType,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/public-property-expression-type': 'error',
      },
    },
  ],
});

test(
  'valid when a property has an explicit type annotation',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      version: string = packageJson.version;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property is a private identifier',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      #version = packageJson.version;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property is pseudo-private',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      privateVersion = packageJson.version;
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a property value is a literal',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      version = '0.0.1';
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a public property uses a call expression without a type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      id = uniqueId();
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicPropertyExpressionType.meta.messages.addExplicitType,
    );
  },
);

test(
  'invalid when a public property uses a conditional expression without a type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      disabled = true ? true : false;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicPropertyExpressionType.meta.messages.addExplicitType,
    );
  },
);

test(
  'invalid when a public property uses a logical expression without a type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      disabled = true || false;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicPropertyExpressionType.meta.messages.addExplicitType,
    );
  },
);

test(
  'invalid when a public property uses a member expression without a type',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      version = packageJson.version;
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      publicPropertyExpressionType.meta.messages.addExplicitType,
    );
  },
);
