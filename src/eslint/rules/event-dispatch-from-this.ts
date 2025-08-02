import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const eventDispatchFromThis = createRule({
  name: 'event-dispatch-from-this',
  meta: {
    docs: {
      description: 'Ensures events are dispatched directly from `this`.',
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
    let isComponent = false;

    return {
      ClassDeclaration(node) {
        if (
          node.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.superClass.name === 'LitElement'
        ) {
          isComponent = true;
        }
      },
      CallExpression(node) {
        if (
          isComponent &&
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
