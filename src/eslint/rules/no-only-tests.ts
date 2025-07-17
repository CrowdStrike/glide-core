import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noOnlyTests = createRule({
  name: 'no-only-tests',
  meta: {
    docs: {
      description: 'Ensures tests do not use "only" by mistake.',
    },
    type: 'suggestion',
    messages: {
      noOnly: '".only" is not allowed.',
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
          node.callee.property.name === 'only'
        ) {
          context.report({
            node,
            messageId: 'noOnly',
          });
        }
      },
    };
  },
});
