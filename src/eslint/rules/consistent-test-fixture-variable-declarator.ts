import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const consistentTestFixtureVariableDeclarator = createRule({
  name: 'consistent-test-fixture-variable-declarator',
  meta: {
    docs: {
      description:
        'Standardizes variable declarators in test files using fixture().',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      consistentNaming:
        'Prefer the variable name for the fixture to be "component".',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      VariableDeclarator(node) {
        const isAFixture =
          node.init &&
          node.init.type === AST_NODE_TYPES.AwaitExpression &&
          node.init.argument &&
          node.init.argument.type === AST_NODE_TYPES.CallExpression &&
          node.init.argument.callee &&
          node.init.argument.callee.type === AST_NODE_TYPES.Identifier &&
          node.init.argument.callee.name === 'fixture' &&
          node.init.argument.arguments?.length > 0;

        if (!isAFixture) {
          return;
        }

        if (
          node.id &&
          node.id.type === AST_NODE_TYPES.Identifier &&
          node.id.name !== 'component'
        ) {
          context.report({
            node: node.id,
            messageId: 'consistentNaming',
          });
        }
      },
    };
  },
});
