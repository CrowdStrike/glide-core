import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { consistentReferenceElementDeclarations } from './consistent-reference-element-declarations.js';
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
            'consistent-reference-element-declarations':
              consistentReferenceElementDeclarations,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/consistent-reference-element-declarations':
          'error',
      },
    },
  ],
});

test(
  'valid when a private field ends with "ElementRef"',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    class TestComponent extends LitElement {
      #anElementRef = createRef();
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'valid when a private field does not use `createRef()`',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class TestComponent {
      #aPrivateField = notUsingARef();
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test(
  'invalid when a public field uses `createRef()` without an "ElementRef" suffix',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class TestComponent {
      elementField = createRef();
    }
  `);

    expect(result?.errorCount).toBe(2);

    expect(result?.messages.map((m) => m.message)).toStrictEqual([
      consistentReferenceElementDeclarations.meta.messages.preferPrivateField,
      consistentReferenceElementDeclarations.meta.messages.addSuffix,
    ]);
  },
);

test(
  'invalid when a public field uses `createRef()` with an "ElementRef" suffix',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class TestComponent {
      prefixSlotElementRef = createRef();
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      consistentReferenceElementDeclarations.meta.messages.preferPrivateField,
    );
  },
);

test(
  'invalid when a private field uses `createRef()` but lacks an "ElementRef" suffix',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class TestComponent {
      #prefixSlotElement = createRef();
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      consistentReferenceElementDeclarations.meta.messages.addSuffix,
    );
  },
);

test(
  'invalid when a private field ends with "Ref" but not "ElementRef"',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class TestComponent {
      #prefixSlotRef = createRef();
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      consistentReferenceElementDeclarations.meta.messages.addSuffix,
    );
  },
);
