import { AST_TOKEN_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

// A custom rule instead of `@stylistic/max-len` because the `comments` option of
// that rule works off total line length, leading to shorter and shorter comments
// the more nested the commented code is. That makes comments for highly nested
// code harder to read.
export const commentMaximumLength = createRule({
  name: 'no-only-tests',
  meta: {
    docs: {
      description: `Ensures comments aren't too long.`,
    },
    type: 'suggestion',
    messages: {
      commentMaximumLength: 'Comments should be 80 characters or fewer.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      Program() {
        const comments = context.sourceCode.getAllComments();

        for (const comment of comments) {
          if (
            comment.type === AST_TOKEN_TYPES.Line &&
            comment.value.trim().length > 80 &&
            !comment.value.includes('http') &&
            !comment.value.includes('eslint-disable')
          ) {
            context.report({
              node: comment,
              messageId: 'commentMaximumLength',
              loc: comment.loc,
            });
          }
        }
      },
    };
  },
});
