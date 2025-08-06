import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noTagsInTestNames = createRule({
  name: 'no-tags-in-test-names',
  meta: {
    docs: {
      description: "Ensures test names don't contain tags.",
    },
    type: 'suggestion',
    messages: {
      noTagsInTestNames: `Remove the "@" from your test name so a new tag isn't created.`,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'test'
        ) {
          const firstArgument = node.arguments.find((_, index) => {
            return index === 0;
          });

          const hasTag =
            firstArgument?.type === AST_NODE_TYPES.Literal &&
            typeof firstArgument.value === 'string' &&
            firstArgument.value.includes('@');

          if (hasTag) {
            context.report({
              node,
              messageId: 'noTagsInTestNames',
            });
          }
        }
      },
    };
  },
});
