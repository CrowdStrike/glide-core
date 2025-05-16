import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L110
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noToHaveAttribute = createRule({
  name: 'no-to-have-attribute',
  meta: {
    docs: {
      description:
        'Using `to.have.attribute()` causes tests to hang when falsy.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      noToHaveAttribute:
        'Prefer using `hasAttribute()` or `getAttribute()` instead of `to.have.attribute()`.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MemberExpression(node) {
        if (
          node.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.property.type === AST_NODE_TYPES.Identifier &&
          node.object.property.name === 'to' &&
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'have' &&
          node.parent &&
          node.parent.type === AST_NODE_TYPES.MemberExpression &&
          node.parent.property.type === AST_NODE_TYPES.Identifier &&
          node.parent.property.name === 'attribute'
        ) {
          context.report({
            node,
            messageId: 'noToHaveAttribute',
          });
        }
      },
    };
  },
});
