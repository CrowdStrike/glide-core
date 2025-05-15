import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L110
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noNestedTemplateLiterals = createRule({
  name: 'no-nested-template-literals',
  meta: {
    docs: {
      description:
        'Forbids the use of a template literal inside of another template literal.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      noNestedTemplateLiterals: 'Nested template literals are not allowed.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      TemplateLiteral(node) {
        for (const expression of node.expressions) {
          if (expression.type === AST_NODE_TYPES.TemplateLiteral) {
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
