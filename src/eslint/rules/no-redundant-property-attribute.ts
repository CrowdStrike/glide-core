import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const noRedudantPropertyAttribute = createRule({
  name: 'no-redundant-property-attribute',
  meta: {
    docs: {
      description:
        'Ensures the Lit property decorator does not specify an attribute key that matches the property name.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      noRedudantPropertyAttribute:
        'The "attribute" defined in the property decorator matches the property declaration name, making it redundant.  Please remove it.',
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

        let variableName = '';

        if (
          node.expression.type === AST_NODE_TYPES.CallExpression &&
          node.expression.callee?.type === AST_NODE_TYPES.Identifier &&
          'name' in node.expression.callee &&
          node.expression.callee.name === 'property'
        ) {
          const nodeParent = node.parent;

          if (!nodeParent) {
            return;
          }

          if (
            nodeParent.type === AST_NODE_TYPES.PropertyDefinition &&
            nodeParent.key.type === AST_NODE_TYPES.Identifier &&
            'name' in nodeParent.key
          ) {
            variableName = nodeParent.key.name;
          }

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
                  'name' in property.key &&
                  property.key.name === 'attribute' &&
                  property.value &&
                  property.value.type === AST_NODE_TYPES.Literal &&
                  property.value.value === variableName
                ) {
                  context.report({
                    node: property,
                    messageId: 'noRedudantPropertyAttribute',
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
                            `Error attempting to lint fix "no-redundant-property-attribute" at range: ${property.range.toString()}". Please report this error to @crowdstrike/glide-core.`,
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
