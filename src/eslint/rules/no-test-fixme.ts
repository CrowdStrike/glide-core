import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noTestFixme = createRule({
  name: 'no-test-fixme',
  meta: {
    docs: {
      description: 'Ensures `test.fixme()` is not used.',
    },
    type: 'suggestion',
    messages: {
      noTestFixme:
        'Fix the test or the code under test instead of using `test.fixme()`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.name === 'test' &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'fixme'
        ) {
          context.report({
            node,
            messageId: 'noTestFixme',
          });
        }
      },
    };
  },
});
