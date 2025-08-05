import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const oneTagPerTest = createRule({
  name: 'one-tag-per-test',
  meta: {
    docs: {
      description: 'Ensures each test only has one tag.',
    },
    type: 'suggestion',
    messages: {
      oneTagPerTest: 'Tests should only have one tag.',
      unnessaryArray:
        'An array for a single tag is unnecessary. Set `tag` to a string instead.',
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

          const hasMoreThanOneTag =
            details?.type === AST_NODE_TYPES.ObjectExpression &&
            details.properties.some((property) => {
              return (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'tag' &&
                property.value.type === AST_NODE_TYPES.ArrayExpression &&
                property.value.elements.length > 1
              );
            });

          if (hasMoreThanOneTag) {
            context.report({
              node,
              messageId: 'oneTagPerTest',
            });

            return;
          }

          const isTagArray =
            details?.type === AST_NODE_TYPES.ObjectExpression &&
            details.properties.some((property) => {
              return (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'tag' &&
                property.value.type === AST_NODE_TYPES.ArrayExpression
              );
            });

          if (isTagArray) {
            context.report({
              node,
              messageId: 'unnessaryArray',
            });

            return;
          }
        }
      },
    };
  },
});
