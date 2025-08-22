import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const addConditionallySkippedTestMessage = createRule({
  name: 'add-conditionally-skipped-test-message',
  meta: {
    docs: {
      description:
        'Ensures tests that are conditionally skipped have a message.',
    },
    type: 'suggestion',
    messages: {
      addConditionallySkippedTestMessage:
        'Add a message explaining why the test is skipped.',
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
          node.callee.property.name === 'skip'
        ) {
          const firstArgument = node.arguments.at(0);

          const isFirstArgumentAFunction =
            firstArgument?.type === AST_NODE_TYPES.ArrowFunctionExpression ||
            firstArgument?.type === AST_NODE_TYPES.FunctionExpression;

          if (!isFirstArgumentAFunction && node.arguments.length === 1) {
            context.report({
              node,
              messageId: 'addConditionallySkippedTestMessage',
            });
          }
        }
      },
    };
  },
});
