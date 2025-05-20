import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const noProtectedKeyword = createRule({
  name: 'no-protected-keyword',
  meta: {
    docs: {
      description:
        "Ensures `protected` isn't used on component class fields. Most developers are unlikely to add `protected` to a method or property. But many editor plugins do, especially when autocompleting Lit lifecycle methods.",
    },
    type: 'suggestion',
    messages: {
      noProtectedKeyword:
        "Via the `@final` decorator our components don't allow extension. So `protected` has no use.",
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    let isComponent = true;

    return {
      ClassDeclaration(node) {
        if (
          node.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.superClass.name !== 'LitElement'
        ) {
          isComponent = false;
          return;
        }
      },
      MethodDefinition(node) {
        if (isComponent && node.accessibility === 'protected') {
          context.report({
            node,
            messageId: 'noProtectedKeyword',
            fix(fixer) {
              const token = context.sourceCode.getFirstToken(
                node,
                (token) => token.value === node.accessibility,
              );

              const tokenRangeStart = token?.range.at(0);
              const tokenRangeEnd = token?.range.at(1);

              return token && tokenRangeStart && tokenRangeEnd
                ? // `1` is added to the end of the range so whitespace trailing `protected`
                  // is removed.
                  fixer.removeRange([tokenRangeStart, tokenRangeEnd + 1])
                : null;
            },
          });
        }
      },
      PropertyDefinition(node) {
        if (isComponent && node.accessibility === 'protected') {
          context.report({
            node,
            messageId: 'noProtectedKeyword',
            fix(fixer) {
              const token = context.sourceCode.getFirstToken(
                node,
                (token) => token.value === node.accessibility,
              );

              const tokenRangeStart = token?.range.at(0);
              const tokenRangeEnd = token?.range.at(1);

              return token && tokenRangeStart && tokenRangeEnd
                ? fixer.removeRange([tokenRangeStart, tokenRangeEnd + 1])
                : null;
            },
          });
        }
      },
    };
  },
});
