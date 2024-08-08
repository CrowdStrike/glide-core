import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const preferClosedShadowRoot = createRule({
  name: 'prefer-closed-shadow-root',
  meta: {
    docs: {
      description: 'Ensures Glide Components close the shadow root.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      missingShadowRootOptions:
        'Prefer Lit Elements to override the default shadowRootOptions.',
      missingMode: 'Prefer a "mode" being set in the shadowRootOptions.',
      setModeClosed:
        'Prefer the shadowRootOptions "mode" being set to "closed".',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      ClassDeclaration(node) {
        if (
          node.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.superClass.name === 'LitElement'
        ) {
          const shadowRootOptions = node.body?.body?.find(
            (body) =>
              body.type === AST_NODE_TYPES.PropertyDefinition &&
              body.static === true &&
              body.override === true &&
              body.key.type === AST_NODE_TYPES.Identifier &&
              body.key.name === 'shadowRootOptions',
          );

          if (!shadowRootOptions) {
            const isTypeScriptFile = context.filename?.endsWith('.ts');

            context.report({
              node,
              messageId: 'missingShadowRootOptions',
              fix: function (fixer) {
                return fixer.insertTextAfterRange(
                  [node.body.range[0], node.body.range[0] + 1],
                  isTypeScriptFile
                    ? `${' '}static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, mode: 'closed' };`
                    : `${' '}static override shadowRootOptions = { ...LitElement.shadowRootOptions, mode: 'closed' };`,
                );
              },
            });
          }
        }
      },
      PropertyDefinition(node) {
        if (
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.key.name === 'shadowRootOptions'
        ) {
          const shadowRootMode =
            node.value?.type === AST_NODE_TYPES.ObjectExpression &&
            node.value.properties?.find(
              (property) =>
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'mode',
            );

          if (!shadowRootMode) {
            context.report({
              node,
              messageId: 'missingMode',
              fix: function (fixer) {
                const nodeToInsertRange =
                  node.value?.type === AST_NODE_TYPES.ObjectExpression &&
                  node.value.properties?.at(-1)?.range;

                if (!nodeToInsertRange) {
                  // eslint-disable-next-line no-console
                  console.error(
                    `Error attempting to lint fix "prefer-closed-shadow-root at range: ${nodeToInsertRange}". Please report this error to @crowdstrike/glide-core.`,
                  );

                  return null;
                }

                return fixer.insertTextAfterRange(
                  [nodeToInsertRange[0], nodeToInsertRange[1]],
                  `,${' '}mode: 'closed'`,
                );
              },
            });
          }

          if (
            shadowRootMode &&
            shadowRootMode.type === AST_NODE_TYPES.Property &&
            shadowRootMode.value.type === AST_NODE_TYPES.Literal &&
            shadowRootMode.value.value !== 'closed'
          ) {
            context.report({
              node,
              messageId: 'setModeClosed',
            });
          }
        }
      },
    };
  },
});
