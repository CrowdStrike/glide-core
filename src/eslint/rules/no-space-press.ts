import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noSpacePress = createRule({
  name: 'no-space-press',
  meta: {
    docs: {
      description:
        'Prefer using " " over "Space" when checking keys to align with the native key value. In application code, checking `event.key === "Space"` is incorrect, as " " is what key will be in this case. https://developer.mozilla.org/en-US/docs/Web/API/UI_Events/Keyboard_event_key_values#whitespace_keys',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      preferWhitespace: 'Prefer using " " for the Space Bar key.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      BinaryExpression(node) {
        if (
          (node.operator === '===' || node.operator === '!==') &&
          node.left.type === AST_NODE_TYPES.MemberExpression &&
          node.left.object.type === AST_NODE_TYPES.Identifier &&
          node.left.property.type === AST_NODE_TYPES.Identifier &&
          node.left.property.name === 'key' &&
          node.right.type === AST_NODE_TYPES.Literal &&
          node.right.value === 'Space'
        ) {
          context.report({
            node,
            messageId: 'preferWhitespace',
            fix: function (fixer) {
              return fixer.replaceText(node.right, "' '");
            },
          });
        }
      },
      CallExpression(node) {
        if (
          node.callee &&
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'sendKeys' &&
          node.arguments.length === 1
        ) {
          const argument = node.arguments.at(0);

          if (argument?.type === AST_NODE_TYPES.ObjectExpression) {
            for (const property of argument.properties) {
              if (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                (property.key.name === 'press' ||
                  property.key.name === 'down' ||
                  property.key.name === 'up') &&
                property.value.type === AST_NODE_TYPES.Literal &&
                property.value.value === 'Space'
              ) {
                context.report({
                  node: property,
                  messageId: 'preferWhitespace',
                  fix: function (fixer) {
                    return fixer.replaceText(property.value, "' '");
                  },
                });
              }
            }
          }
        }
      },
    };
  },
});
