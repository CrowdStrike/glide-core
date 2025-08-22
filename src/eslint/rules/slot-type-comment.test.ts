import parser from '@typescript-eslint/parser';
import { ESLint } from '@typescript-eslint/utils/ts-eslint';
import { slotTypeComment } from './slot-type-comment.js';
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
            'slot-type-comment': slotTypeComment,
          },
        },
      },
      rules: {
        '@crowdstrike/glide-core/slot-type-comment': 'error',
      },
    },
  ],
});

test(
  'valid when a slot has a proper type comment',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      render() {
        return html\`
          <slot>
            <!-- @type {Element} -->
          </slot>
        \`
      }
    }
  `);

    expect(result?.errorCount).toBe(0);
  },
);

test('invalid when a slot has no comment', { tag: '@eslint' }, async () => {
  const [result] = await eslint.lintText(`
    export default class {
      render() {
        return html\`
          <slot></slot>
        \`
      }
    }
  `);

  expect(result?.errorCount).toBe(1);

  expect(result?.messages.at(0)?.message).toBe(
    slotTypeComment.meta.messages.addSlotComment,
  );
});

test(
  'invalid when a slot comment has no type tag',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      render() {
        return html\`
          <slot class=\${classMap()}>
            <!-- @require -->
          </slot>
        \`
      }
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      slotTypeComment.meta.messages.addSlotTypeComment,
    );
  },
);

test(
  'invalid when a type tag has no type specified',
  { tag: '@eslint' },
  async () => {
    const [result] = await eslint.lintText(`
    export default class {
      render() {
        return html\`
          <slot>
            <!-- @type Element -->
          </slot>
        \`
      }
    }
  `);

    expect(result?.errorCount).toBe(1);

    expect(result?.messages.at(0)?.message).toBe(
      slotTypeComment.meta.messages.addSlotTypeCommentType,
    );
  },
);
