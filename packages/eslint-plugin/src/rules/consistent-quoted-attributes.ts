import { ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator(
  (name) =>
    `https://github.com/CrowdStrike/glide-core/blob/main/packages/eslint-plugin/src/rules/${name}.ts`,
);

export const consistentQuotedAttributes = createRule({
  name: 'consistent-quoted-attributes',
  meta: {
    docs: {
      description:
        'Ensures attribute values within Lit HTML template literals are wrapped by either double quotes or an interpolated expression',
      recommended: 'recommended',
    },
    type: 'suggestion',
    messages: {
      consistentQuotedAttributes:
        'HTML attribute values must be wrapped in " " or ${}',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create: (context) => {
    return {
      TaggedTemplateExpression(node) {
        const expressions = node.quasi.expressions;
        const quasis = node.quasi.quasis;

        const invalidMatches = [];

        for (const quasi of quasis) {
          if (quasi.type === 'TemplateElement') {
            const value = quasi.value.cooked;
            const attributeMatcher = /[a-z]+=(.*)/g;
            const matches = [...value.matchAll(attributeMatcher)];
            const numberOfMatches = matches.length;

            const isQuasiFollowedByExpression = expressions.find(
              (expression) => {
                return quasi.range[1] === expression.range[0];
              },
            );

            for (const [index, match] of matches.entries()) {
              const afterEqualSign = match[1];
              const isDoubleQuoted = afterEqualSign.startsWith('"');

              const isLast = index === numberOfMatches - 1;
              const isMatchFollowedByExpression =
                afterEqualSign === '' && isLast && isQuasiFollowedByExpression;

              if (!(isDoubleQuoted || isMatchFollowedByExpression)) {
                invalidMatches.push(match);
              }
            }
          }
        }

        if (invalidMatches.length > 0) {
          context.report({
            node,
            messageId: 'consistentQuotedAttributes',
          });
        }
      },
    };
  },
});
