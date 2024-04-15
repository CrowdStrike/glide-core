import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const prefixedClassDeclaration = createRule({
  name: 'prefixed-lit-element-class-declaration',
  meta: {
    docs: {
      description:
        'Ensures all web components that extend a LitElement are prefixed with "Cs".',
      recommended: 'recommended',
    },
    type: 'suggestion',
    messages: {
      addPrefix:
        'Prefer elements extending LitElement to be prefixed with "Cs".',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ClassDeclaration(node) {
        if (
          node.id?.type === 'Identifier' &&
          node.superClass?.type === 'Identifier' &&
          node.superClass?.name === 'LitElement' &&
          !node.id?.name?.startsWith('Cs')
        ) {
          context.report({
            node,
            messageId: 'addPrefix',
            fix: function (fixer) {
              const nodeId = node.id;

              if (!nodeId) {
                console.error(
                  `Error attempting to lint fix: "${nodeId}". Please report this error to @crowdstrike/glide-core.`,
                );
                return null;
              }

              return fixer.replaceText(nodeId, `Cs${node.id?.name}`);
            },
          });
        }
      },
    };
  },
});
