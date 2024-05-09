import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const preferClosedShadowRoot = createRule({
  name: 'prefer-closed-shadow-root',
  meta: {
    docs: {
      description: 'Ensures Glide Components close the shadow root.',
      recommended: 'recommended',
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
          node.superClass?.type === 'Identifier' &&
          node.superClass.name === 'LitElement'
        ) {
          const shadowRootOptions = node.body?.body?.find(
            (body) =>
              body.type === 'PropertyDefinition' &&
              body.static === true &&
              body.override === true &&
              body.key.type === 'Identifier' &&
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
          node.key.type === 'Identifier' &&
          node.key.name === 'shadowRootOptions'
        ) {
          const shadowRootMode =
            node.value?.type === 'ObjectExpression' &&
            node.value.properties?.find(
              (property) =>
                property.type === 'Property' &&
                property.key.type === 'Identifier' &&
                property.key.name === 'mode',
            );

          if (!shadowRootMode) {
            context.report({
              node,
              messageId: 'missingMode',
              fix: function (fixer) {
                const nodeToInsertRange =
                  node.value?.type === 'ObjectExpression' &&
                  node.value.properties?.at(-1)?.range;

                if (!nodeToInsertRange) {
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
            shadowRootMode.type === 'Property' &&
            shadowRootMode.value.type === 'Literal' &&
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
