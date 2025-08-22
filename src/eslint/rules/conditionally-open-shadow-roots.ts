import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const conditionallyOpenShadowRoots = createRule({
  name: 'conditionally-open-shadow-roots',
  meta: {
    docs: {
      description:
        'Ensures shadow roots are open for tests but otherwise closed.',
    },
    type: 'suggestion',
    messages: {
      noShadowRootOptions:
        'Add a static `shadowRootOptions` property to your component. See other components for an example.',
      noMode: 'Add a `mode` property to `shadowRootOptions`.',
      wrongMode:
        '`mode` should be closed by default but open in tests. See other components for an example.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
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
            context.report({
              node,
              messageId: 'noShadowRootOptions',
            });
          }
        }
      },
      PropertyDefinition(node) {
        if (
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.key.name === 'shadowRootOptions'
        ) {
          const mode =
            node.value?.type === AST_NODE_TYPES.ObjectExpression &&
            node.value.properties?.find(
              (property) =>
                property.type === AST_NODE_TYPES.Property &&
                property.key.type === AST_NODE_TYPES.Identifier &&
                property.key.name === 'mode',
            );

          if (!mode) {
            context.report({
              node,
              messageId: 'noMode',
            });

            return;
          }

          const isOnlyOpenInTests =
            mode &&
            mode.type === AST_NODE_TYPES.Property &&
            mode.value.type === AST_NODE_TYPES.ConditionalExpression &&
            mode.value.consequent.type === AST_NODE_TYPES.Literal &&
            mode.value.consequent.value === 'open' &&
            mode.value.alternate.type === AST_NODE_TYPES.Literal &&
            mode.value.alternate.value === 'closed' &&
            mode.value.test.type === AST_NODE_TYPES.MemberExpression &&
            mode.value.test.object.type === AST_NODE_TYPES.MemberExpression &&
            mode.value.test.object.property.type ===
              AST_NODE_TYPES.Identifier &&
            mode.value.test.object.property.name === 'navigator' &&
            mode.value.test.property.type === AST_NODE_TYPES.Identifier &&
            mode.value.test.property.name === 'webdriver' &&
            mode.value.test.object.object.type === AST_NODE_TYPES.Identifier &&
            mode.value.test.object.object.name === 'window';

          if (!isOnlyOpenInTests) {
            context.report({
              node,
              messageId: 'wrongMode',
            });
          }
        }
      },
    };
  },
});
