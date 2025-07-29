import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noToContainClass = createRule({
  name: 'no-to-contain-class',
  meta: {
    docs: {
      description: 'Ensures `expect().toContainClass()` is not used.',
    },
    type: 'suggestion',
    messages: {
      noToContainClass:
        'Avoid `toContainClass(). Write a visual test if you are testing something visual. Otherwise, if your are testing state, use another locator assertion.',
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
          node.property.name === 'toContainClass'
        ) {
          context.report({
            node,
            messageId: 'noToContainClass',
          });
        }
      },
    };
  },
});
