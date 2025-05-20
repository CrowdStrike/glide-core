import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const betterTestAssertions = createRule({
  name: 'better-test-assertions',
  meta: {
    docs: {
      description:
        'Ensures assertions are written in a natural, declarative way.',
    },
    type: 'suggestion',
    messages: {
      preferToBeEmptyString:
        '`to.be.empty.string` is more declarative. Use it instead.',
      preferToBeNull: '`to.be.null` is more declarative. Use it instead.',
      preferToBeUndefined:
        '`to.be.undefined` is more declarative. Use it instead.',
      preferToBeTrue: '`to.be.true` is more declarative. Use it instead.',
      preferToBeFalse: '`to.be.false` is more declarative. Use it instead.',
      preferToEqual: '`to.equal()` reads better. Use it instead.',
      preferToDeepEqual: '`to.deep.equal()` reads better. Use it instead.',
      preferToNotEqual: '`to.not.equal()` reads better. Use it instead.',
      preferToNotDeepEqual:
        '`to.not.deep.equal()` reads better. Use it instead.',
      preferToNotBe: '`to.not.be` reads better. Use it instead.',
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
        // Covering every Chai property and combination thereof isn't worth our time or
        // the added code weight. So we instead cover only the most common ones. Similar
        // for fixing violations automatically. Doing so isn't worth the effort or complexity
        // given how easy these violations are to fix manually.
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
              node,
              messageId: 'preferToBeEmptyString',
            });

            return;
          }

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Literal &&
            firstArgument.value === null
          ) {
            context.report({
              node,
              messageId: 'preferToBeNull',
            });

            return;
          }

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Identifier &&
            firstArgument.name === 'undefined'
          ) {
            context.report({
              node,
              messageId: 'preferToBeUndefined',
            });

            return;
          }

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Literal &&
            firstArgument.value === true
          ) {
            context.report({
              node,
              messageId: 'preferToBeTrue',
            });

            return;
          }

          if (
            firstArgument &&
            firstArgument.type === AST_NODE_TYPES.Literal &&
            firstArgument.value === false
          ) {
            context.report({
              node,
              messageId: 'preferToBeFalse',
            });

            return;
          }

          if (
            node.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.property.name === 'be' &&
            node.object.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.object.property.name === 'to'
          ) {
            context.report({
              node,
              messageId: 'preferToEqual',
            });

            return;
          }

          if (
            node.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.property.name === 'deep' &&
            node.object.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.object.property.name === 'be' &&
            node.object.object.object.type ===
              AST_NODE_TYPES.MemberExpression &&
            node.object.object.object.property.type ===
              AST_NODE_TYPES.Identifier &&
            node.object.object.object.property.name === 'to'
          ) {
            context.report({
              node,
              messageId: 'preferToDeepEqual',
            });

            return;
          }

          if (
            node.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.property.name === 'to' &&
            node.object.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.object.property.name === 'not'
          ) {
            context.report({
              node,
              messageId: 'preferToNotEqual',
            });

            return;
          }

          if (
            node.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.property.name === 'deep' &&
            node.object.object.type === AST_NODE_TYPES.MemberExpression &&
            node.object.object.property.type === AST_NODE_TYPES.Identifier &&
            node.object.object.property.name === 'to' &&
            node.object.object.object.type ===
              AST_NODE_TYPES.MemberExpression &&
            node.object.object.object.property.type ===
              AST_NODE_TYPES.Identifier &&
            node.object.object.object.property.name === 'not'
          ) {
            context.report({
              node,
              messageId: 'preferToNotDeepEqual',
            });

            return;
          }
        }

        if (
          isProbablyATest &&
          node.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.object.property.type === AST_NODE_TYPES.Identifier &&
          node.object.object.property.name === 'to' &&
          node.object.object.object.type === AST_NODE_TYPES.MemberExpression &&
          node.object.object.object.property.type ===
            AST_NODE_TYPES.Identifier &&
          node.object.object.object.property.name === 'not' &&
          node.object.property.type === AST_NODE_TYPES.Identifier &&
          node.object.property.name === 'be'
        ) {
          context.report({
            node,
            messageId: 'preferToNotBe',
          });

          return;
        }
      },
    };
  },
});
