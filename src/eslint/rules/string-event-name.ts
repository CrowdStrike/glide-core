import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L110
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const stringEventName = createRule({
  name: 'string-event-name',
  meta: {
    docs: {
      description: 'Ensures events names are strings.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      stringEventName:
        'Use a string for the event name to help us populate our elements manifest with events.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      NewExpression(node) {
        const isRelevantConstructor =
          node.callee.type === AST_NODE_TYPES.Identifier &&
          ['Event', 'CustomEvent'].includes(node.callee.name);

        if (
          isRelevantConstructor &&
          node.arguments.at(0)?.type !== AST_NODE_TYPES.Literal
        ) {
          context.report({
            node,
            messageId: 'stringEventName',
          });
        }
      },
    };
  },
});
