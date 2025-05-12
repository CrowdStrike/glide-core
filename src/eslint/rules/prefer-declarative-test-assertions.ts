import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109

const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const preferDeclarativeTestAssertions = createRule({
  name: 'prefer-declarative-test-assertions',
  meta: {
    docs: {
      description:
        'Ensures tests are not skipped, as we do not want to accumulate a collection of skipped tests that never get addressed.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      preferToBeEmptyString:
        '`to.be.empty.string` is more declarative. Use it instead.',
      preferToBeNull: '`to.be.null` is more declarative. Use it instead.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    let isProbablyATest = false;

    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'it'
        ) {
          isProbablyATest = true;
        }
      },
      MemberExpression(node) {
        if (
          isProbablyATest &&
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'equal' &&
          node.parent.type === AST_NODE_TYPES.CallExpression
        ) {
          const firstArgument = node.parent.arguments.at(0);

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Literal &&
            firstArgument.value === ''
          ) {
            context.report({
              node: node,
              messageId: 'preferToBeEmptyString',
            });
          }
        }

        if (
          isProbablyATest &&
          node.property.type === AST_NODE_TYPES.Identifier &&
          node.property.name === 'equal' &&
          node.parent.type === AST_NODE_TYPES.CallExpression
        ) {
          const firstArgument = node.parent.arguments.at(0);

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Literal &&
            firstArgument.value === null
          ) {
            context.report({
              node: node,
              messageId: 'preferToBeNull',
            });
          }
        }
      },
    };
  },
});
