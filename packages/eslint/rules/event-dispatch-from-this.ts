import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const eventDispatchFromThis = createRule({
  name: 'event-dispatch-from-this',
  meta: {
    docs: {
      description: 'Ensures events are dispatched directly from `this`.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      dispatchFromThis:
        'Dispatch events directly from `this` to help us populate our elements manifest with events.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'dispatchEvent' &&
          node.callee.object.type !== AST_NODE_TYPES.ThisExpression
        ) {
          context.report({
            node,
            messageId: 'dispatchFromThis',
          });
        }
      },
    };
  },
});
