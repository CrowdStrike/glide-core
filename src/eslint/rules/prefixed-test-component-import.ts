import { ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const prefixedTestComponentImport = createRule({
  name: 'prefixed-test-component-import',
  meta: {
    docs: {
      description:
        'Ensures named imports in a test file are prefixed with "GlideCore".',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      addPrefix: 'Prefer imports to be prefixed with "GlideCore".',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ImportDeclaration(node) {
        if (node.specifiers?.length === 0) {
          return;
        }

        const importName = node.specifiers[0].local.name;

        if (
          node.source.value.startsWith('./') &&
          !node.source.value.includes('/library/') &&
          !importName?.startsWith('GlideCore')
        ) {
          context.report({
            node,
            messageId: 'addPrefix',
            fix: function (fixer) {
              const newName = `GlideCore${importName}`;

              const fixes = [
                fixer.replaceText(node.specifiers[0].local, newName),
              ];

              const { sourceCode } = context;
              const scope = sourceCode.getScope(node);
              const variable = scope.set.get(importName);

              if (variable) {
                for (const reference of variable.references) {
                  if (reference.identifier.parent !== node.specifiers[0]) {
                    fixes.push(
                      fixer.replaceText(reference.identifier, newName),
                    );
                  }
                }
              }

              return fixes;
            },
          });
        }
      },
    };
  },
});
