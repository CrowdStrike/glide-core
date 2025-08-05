import path from 'node:path';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const testTagMatchesSuite = createRule({
  name: 'test-tag-matches-suite',
  meta: {
    docs: {
      description:
        'Ensures tests are tagged according to the name of their suite.',
    },
    type: 'suggestion',
    messages: {
      testTagMatchesSuite: `A test's tag should reflect the name of its suite. "{{tag}}" should be "@{{suite}}".`,
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'test'
        ) {
          const details = node.arguments.find(({ type }, index) => {
            return type === AST_NODE_TYPES.ObjectExpression && index === 1;
          });

          const base = path.parse(context.filename).base;
          const isTest = base.includes('__placeholder__');
          const suite = isTest ? 'eslint' : base.split('.').at(-2);

          if (details?.type === AST_NODE_TYPES.ObjectExpression) {
            const tag = details.properties.find((property) => {
              return (
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'tag'
              );
            });

            if (
              tag?.type === AST_NODE_TYPES.Property &&
              tag.value.type === AST_NODE_TYPES.Literal &&
              typeof tag.value.value === 'string' &&
              tag.value.value.replace(/^@/, '') !== suite
            ) {
              context.report({
                node,
                messageId: 'testTagMatchesSuite',
                data: { suite, tag: tag.value.value },
              });
            }
          }
        }
      },
    };
  },
});
