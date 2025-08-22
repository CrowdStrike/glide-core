import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { noNestedTemplateLiterals } from './no-nested-template-literals.js';
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
            'no-nested-template-literals': noNestedTemplateLiterals,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/no-nested-template-literals': 'error',
      },
    },
  ],
});

test(
  'valid when a template literal is not nested',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    console.log(\`Hello, @\${username}!\`);
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a template literal in a render method is not nested',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement {
      render() {
        return html\`<svg width="\${this.#triangleWidth}px">\`;
      }
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a template literal is nested in a console log',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    console.log(\`Hello, \${\`@\${username}\`}!\`);
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noNestedTemplateLiterals.meta.messages.noNestedTemplateLiterals,
    );
  },
);

test(
  'invalid when a template literal is nested in a render method',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement {
      render() {
        return html\`<svg width=\${\`\${this.#triangleWidth}px\`}>\`;
      }
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      noNestedTemplateLiterals.meta.messages.noNestedTemplateLiterals,
    );
  },
);
