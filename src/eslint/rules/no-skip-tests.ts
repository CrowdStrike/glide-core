import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noSkipTests = createRule({
  name: 'no-skip-tests',
  meta: {
    docs: {
      description:
        'Ensures tests are not skipped, as we do not want to accumulate a collection of skipped tests that never get addressed.',
    },
    type: 'suggestion',
    messages: {
      noSkip: '".skip" is not allowed.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.arguments?.length > 0 &&
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.name === 'it' &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'skip'
        ) {
          context.report({
            node: node,
            messageId: 'noSkip',
          });
        }
      },
    };
  },
});
