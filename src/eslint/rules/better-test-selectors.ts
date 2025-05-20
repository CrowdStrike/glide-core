import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const betterTestSelectors = createRule({
  name: 'better-test-selectors',
  meta: {
    docs: {
      description:
        'Ensures tests use `[data-test=""]` selectors when appropriate.',
    },
    type: 'suggestion',
    messages: {
      useDataTestSelector:
        'Select the element using a `data-test` attribute selector so there is an explict link between markup and its tests.',
      avoidDataTestSelector:
        'No need to use a `data-test` selector when selecting elements in the light DOM.',
      useStringLiteralSelector:
        'Use a string literal as your selector to help us lint for and against `data-test` attribute selectors.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    let isProbablyATest = false;

    return {
      CallExpression(node) {
        console.log(
          context.sourceCode
            .getScope(node)
            .references.find(
              (reference) => reference.identifier.name === 'selector',
            ),
        );

        if (
          node.callee.type === AST_NODE_TYPES.Identifier &&
          node.callee.name === 'it'
        ) {
          isProbablyATest = true;
        }

        if (!isProbablyATest) {
          return;
        }

        // TODO: explain why allow data test in the latter two calls.
        // because they'll fail when a data test select is added
        const isElementSelection =
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.property.type === AST_NODE_TYPES.Identifier &&
          [
            'querySelector',
            'querySelectorAll',
            'getElementById',
            'getElementsByClassName',
          ].includes(node.callee.property.name);

        if (!isElementSelection) {
          return;
        }

        const isLightDomSelector =
          node.callee.type === AST_NODE_TYPES.MemberExpression &&
          node.callee.object.type === AST_NODE_TYPES.Identifier &&
          ['host', 'document'].includes(node.callee.object.name);

        const firstArgument = node.arguments.at(0);

        const isSelectorAString =
          firstArgument &&
          firstArgument.type === AST_NODE_TYPES.Literal &&
          typeof firstArgument.value === 'string';

        const hasDataTestSelector =
          // TODO: say why not $
          isSelectorAString && /^\[data-test=".+"]/.test(firstArgument.value);

        // TODO
        // This logic below certainly isn't fallable.
        // - say how.
        // - say how the complexity wouldn't be worth it.
        // - say how its good enough for a design system.
        if (isLightDomSelector && hasDataTestSelector) {
          context.report({
            node,
            messageId: 'avoidDataTestSelector',
          });

          return;
        }

        if (!isSelectorAString) {
          context.report({
            node,
            messageId: 'useStringLiteralSelector',
          });

          return;
        }

        if (!hasDataTestSelector && !isLightDomSelector) {
          context.report({
            node,
            messageId: 'useDataTestSelector',
          });

          return;
        }
      },
    };
  },
});
