import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const useExtendedPlaywright = createRule({
  name: 'use-extended-playwright',
  meta: {
    docs: {
      description: "Ensures '@playwright/test' isn't used directly.",
    },
    type: 'suggestion',
    messages: {
      useExtendedPlaywright:
        'Import from `./src/library/playwright/test.js` instead so our tests are consistent and so you get all the bells and whistles.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.type === AST_NODE_TYPES.Literal &&
          node.source.value === '@playwright/test'
        )
          context.report({
            node,
            messageId: 'useExtendedPlaywright',
          });
      },
    };
  },
});
