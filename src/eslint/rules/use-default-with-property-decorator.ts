import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const useDefaultWithPropertyDecorator = createRule({
  name: 'use-default-with-property-decorator',
  meta: {
    docs: {
      description:
        "Ensures Lit's `@property()` decorator uses `useDefault` when the property is reflected and has a default value that's a literal.",
    },
    type: 'suggestion',
    messages: {
      useDefaultWithPropertyDecorator:
        "Add `useDefault: true` to your decorator's options so the property's default value isn't reflected.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      PropertyDefinition(node) {
        const isExtendsLitElement =
          node.parent.parent.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.parent.parent.superClass.name === 'LitElement';

        const hasLiteralValue = node.value?.type === AST_NODE_TYPES.Literal;

        const isNegativeNumber =
          node.value?.type === AST_NODE_TYPES.UnaryExpression &&
          node.value.operator === '-' &&
          node.value.argument.type === AST_NODE_TYPES.Literal &&
          typeof node.value.argument.value === 'number';

        const propertyDecorator = node.decorators.find((decorator) => {
          return (
            decorator.expression.type === AST_NODE_TYPES.CallExpression &&
            decorator.expression.callee.type === AST_NODE_TYPES.Identifier &&
            decorator.expression.callee.name === 'property'
          );
        });

        if (
          isExtendsLitElement &&
          (hasLiteralValue || isNegativeNumber) &&
          propertyDecorator &&
          propertyDecorator?.expression.type === AST_NODE_TYPES.CallExpression
        ) {
          const hasReflect = propertyDecorator.expression.arguments.some(
            (argument) => {
              return (
                argument.type === AST_NODE_TYPES.ObjectExpression &&
                argument.properties.some((property) => {
                  return (
                    property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Identifier &&
                    property.key.name === 'reflect' &&
                    property.value.type === AST_NODE_TYPES.Literal &&
                    property.value.value === true
                  );
                })
              );
            },
          );

          const isBoolean = propertyDecorator.expression.arguments.some(
            (argument) => {
              return (
                argument.type === AST_NODE_TYPES.ObjectExpression &&
                argument.properties.some((property) => {
                  return (
                    property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Identifier &&
                    property.key.name === 'type' &&
                    property.value.type === AST_NODE_TYPES.Identifier &&
                    property.value.name === 'Boolean'
                  );
                })
              );
            },
          );

          const hasUseDefault = propertyDecorator.expression.arguments.some(
            (argument) => {
              return (
                argument.type === AST_NODE_TYPES.ObjectExpression &&
                argument.properties.some((property) => {
                  return (
                    property.type === AST_NODE_TYPES.Property &&
                    property.key.type === AST_NODE_TYPES.Identifier &&
                    property.key.name === 'useDefault' &&
                    property.value.type === AST_NODE_TYPES.Literal &&
                    property.value.value === true
                  );
                })
              );
            },
          );

          // If the property is overridden and has a default value, there's a very good
          // chance it's being set to something other than its default as defined by the
          // browser. If that's the case, then it should be reflected.
          //
          // But it's more than a matter of correctness. Axe, for example, commonly uses
          // `getAttribute()` instead of property access to look up an attribute's value. So
          // attributes like `role` always have to be reflected. Otherwise, tests that use
          // Axe may fail due to Axe thinking the attribute is missing. Another example is
          // `tabindex`, which won't make an element focusable if not reflected.
          if (hasReflect && !isBoolean && !node.override && !hasUseDefault) {
            context.report({
              node,
              messageId: 'useDefaultWithPropertyDecorator',
            });
          }
        }
      },
    };
  },
});
