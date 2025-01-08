import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noOnlyTests = createRule({
  name: 'no-only-tests',
  meta: {
    docs: {
      description: 'Ensures tests do not use "only" by mistake.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      noOnly: '".only" is not allowed.',
    },
    schema: [],
  },
  defaultOptions: [],
  create: (context) => {
    return {
      CallExpression(node) {
        if (
          node.arguments?.length > 0 &&
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.name === 'test' &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'only'
        ) {
          context.report({
            node: node,
            messageId: 'noOnly',
          });
        }
      },
    };
  },
});
