import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noRedudantPropertyStringType = createRule({
  name: 'no-redundant-property-string-type',
  meta: {
    docs: {
      description:
        'Ensures the Lit property decorator does not specify "type: String" as it is the default already.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      noRedudantPropertyStringType:
        '"type: String" is the default for the property decorator, making this redundant. Please remove it.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    let isLitElement = true;

    return {
      ClassDeclaration(node) {
        if (
          !node.superClass ||
          (node.superClass?.type === AST_NODE_TYPES.Identifier &&
            'name' in node.superClass &&
            node.superClass.name !== 'LitElement')
        ) {
          isLitElement = false;
          return;
        }
      },
      Decorator(node) {
        if (!isLitElement) {
          return;
        }

        if (
          node.expression &&
          node.expression.type === AST_NODE_TYPES.CallExpression &&
          node.expression.arguments?.length > 0
        ) {
          const expressionArguments = node.expression.arguments;

          for (const argument of expressionArguments) {
            if (
              argument.type === AST_NODE_TYPES.ObjectExpression &&
              argument.properties
            ) {
              for (const property of argument.properties) {
                if (
                  property.type === AST_NODE_TYPES.Property &&
                  property.key?.type === AST_NODE_TYPES.Identifier &&
                  property.key.name === 'type' &&
                  property.value &&
                  property.value.type === AST_NODE_TYPES.Identifier &&
                  property.value.name === 'String'
                ) {
                  context.report({
                    node: property,
                    messageId: 'noRedudantPropertyStringType',
                    fix: function (fixer) {
                      if (argument.properties?.length === 1) {
                        const source = context.sourceCode;
                        const tokenBefore = source.getTokenBefore(argument);
                        const tokenAfter = source.getTokenAfter(argument);

                        const rangeStart =
                          tokenBefore?.value === ','
                            ? tokenBefore.range[0]
                            : argument.range[0];

                        const rangeAfter =
                          tokenAfter?.value === ','
                            ? tokenAfter.range[1]
                            : argument.range[1];

                        if (argument.properties?.length > 0) {
                          return fixer.removeRange([rangeStart, rangeAfter]);
                        }
                      }

                      if (argument.properties?.length > 1) {
                        const source = context.sourceCode;
                        const tokenBefore = source.getTokenBefore(property);
                        const tokenAfter = source.getTokenAfter(property);

                        if (!tokenBefore || !tokenAfter) {
                          // eslint-disable-next-line no-console
                          console.error(
                            `Error attempting to lint fix "no-redundant-property-string-type" at range: ${property.range.toString()}". Please report this error to @crowdstrike/glide-core.`,
                          );

                          return null;
                        }

                        return fixer.removeRange([
                          tokenBefore.range[0] + 1,
                          tokenAfter.range[1],
                        ]);
                      }

                      return null;
                    },
                  });
                }
              }
            }
          }
        }
      },
    };
  },
});
