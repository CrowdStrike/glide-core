import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const alwaysTagTests = createRule({
  name: 'always-tag-tests',
  meta: {
    docs: {
      description: 'Ensures tests are tagged.',
    },
    type: 'suggestion',
    messages: {
      alwaysTagTests: 'Tag your test to make finding tests easier.',
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
          const details = node.arguments.find(({ type }, index) => {
            return type === AST_NODE_TYPES.ObjectExpression && index === 1;
          });

          const hasTag =
            details?.type === AST_NODE_TYPES.ObjectExpression &&
            details.properties.some((property) => {
              return (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'tag'
              );
            });

          if (!hasTag) {
            context.report({
              node,
              messageId: 'alwaysTagTests',
            });
          }
        }
      },
    };
  },
});
