import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noToHaveClass = createRule({
  name: 'no-to-have-class',
  meta: {
    docs: {
      description:
        'Ensures `expect().toHaveClass()` and `expect().not.toHaveClass()` are not used.',
    },
    type: 'suggestion',
    messages: {
      noToHaveClass:
        'Avoid `toHaveClass()`. Write a visual test if you are testing something visual. Otherwise, use a different assertion.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.type === AST_NODE_TYPES.CallExpression &&
          node.object.callee.type === AST_NODE_TYPES.Identifier &&
          node.object.callee.name === 'expect' &&
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'toHaveClass'
        ) {
          context.report({
            node,
            messageId: 'noToHaveClass',
          });
        }

        if (
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'toHaveClass' &&
          node.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.object.type === AST_NODE_TYPES.CallExpression &&
          node.object.object.callee.type === AST_NODE_TYPES.Identifier &&
          node.object.property.type === AST_NODE_TYPES.Identifier &&
          node.object.property.name === 'not'
        ) {
          context.report({
            node,
            messageId: 'noToHaveClass',
          });
        }
      },
    };
  },
});
