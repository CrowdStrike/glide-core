import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noTestFail = createRule({
  name: 'no-test-fail',
  meta: {
    docs: {
      description: 'Ensures `test.fail()` is not used.',
    },
    type: 'suggestion',
    messages: {
      noTestFail:
        'Fix the test or the code under test instead of using `test.fail()`.',
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
          node.callee.property.name === 'fail'
        ) {
          context.report({
            node,
            messageId: 'noTestFail',
          });
        }
      },
    };
  },
});
