import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noNestedTemplateLiterals = createRule({
  name: 'no-nested-template-literals',
  meta: {
    docs: {
      description:
        'Forbids the use of a template literal inside of another template literal.',
      recommended: 'recommended',
    },
    type: 'suggestion',
    messages: {
      noNestedTemplateLiterals: 'Nested template literals are not allowed.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      TemplateLiteral(node) {
        for (const expression of node.expressions) {
          if (expression.type === 'TemplateLiteral') {
            context.report({
              node: expression,
              messageId: 'noNestedTemplateLiterals',
            });
          }
        }
      },
    };
  },
});
