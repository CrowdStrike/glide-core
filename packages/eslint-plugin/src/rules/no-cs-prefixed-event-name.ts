import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noPrefixedEventName = createRule({
  name: 'no-cs-prefixed-event-name',
  meta: {
    docs: {
      description:
        'Removes the "cs-" prefix from an Event or CustomEvent type.',
      recommended: 'recommended',
    },
    type: 'suggestion',
    messages: {
      noPrefix:
        'Prefer using event names without the "cs-" prefix when constructing an Event or CustomEvent. Please remove it.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      NewExpression(node) {
        if (
          node.callee.type === 'Identifier' &&
          (node.callee.name === 'Event' ||
            node.callee.name === 'CustomEvent') &&
          node.arguments.length > 0 &&
          node.arguments[0].type === 'Literal' &&
          typeof node.arguments[0].value === 'string' &&
          node.arguments[0].value.startsWith('cs-')
        ) {
          const eventName = node.arguments[0].value.toString();
          context.report({
            node,
            messageId: 'noPrefix',
            fix: function (fixer) {
              return fixer.replaceText(
                node.arguments[0],
                `'${eventName.replace('cs-', '')}'`,
              );
            },
          });
        }
      },
    };
  },
});
