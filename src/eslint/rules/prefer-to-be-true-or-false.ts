import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109

const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const preferToBeTrueOrFalse = createRule({
  name: 'prefer-to-be-true-or-false',
  meta: {
    docs: {
      description:
        'Prefer using `.to.be.true` or `.to.be.false` instead of `to.equal(true)` or `.to.equal(false)`.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      preferToBeFalse: 'Prefer using `.to.be.false` over `.to.equal(false)`.',
      preferToBeTrue: 'Prefer using `.to.be.true` over `.to.equal(true)`.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.object &&
          node.callee.object.object.type === AST_NODE_TYPES.CallExpression &&
          node.callee.object.object.callee &&
          node.callee.object.object.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.object.callee.name === 'expect' &&
          node.callee.object.property &&
          node.callee.object.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.object.property.name === 'to' &&
          node.callee.property &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          node.callee.property.name === 'equal' &&
          node.arguments &&
          node.arguments?.length > 0 &&
          node.arguments[0]?.type === AST_NODE_TYPES.Literal
        ) {
          if (node.arguments[0].value === false) {
            context.report({
              node,
              messageId: 'preferToBeFalse',
              fix: function (fixer) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
                  return null;
                }

                const closingParenthesis =
                  context.sourceCode.getLastToken(node);

                if (!closingParenthesis) {
                  return null;
                }

                // We replace from `equal(false)` to the end of the closing argument parenthesis,
                // which we have to determine with the above logic.
                //
                // We can't take `node.range[1]`, because we'd lose the trailing semicolon and making an assumption
                // with `node.range[1] - 1` feels a bit brittle.
                return fixer.replaceTextRange(
                  [node.callee.property.range[0], closingParenthesis.range[1]],
                  'be.false',
                );
              },
            });
          }

          if (node.arguments[0].value === true) {
            context.report({
              node,
              messageId: 'preferToBeTrue',
              fix: function (fixer) {
                if (node.callee.type !== AST_NODE_TYPES.MemberExpression) {
                  return null;
                }

                const closingParenthesis =
                  context.sourceCode.getLastToken(node);

                if (!closingParenthesis) {
                  return null;
                }

                // We replace from `equal(true)` to the end of the closing argument parenthesis,
                // which we have to determine with the above logic.
                //
                // We can't take `node.range[1]`, because we'd lose the trailing semicolon and making an assumption
                // with `node.range[1] - 1` feels a bit brittle.
                return fixer.replaceTextRange(
                  [node.callee.property.range[0], closingParenthesis.range[1]],
                  'be.true',
                );
              },
            });
          }
        }
      },
    };
  },
});
