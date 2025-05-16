import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L110
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const useFinalDecorator = createRule({
  name: 'use-final-decorator',
  meta: {
    docs: {
      description:
        "Ensures components are decorated with `@final`. We want consumers to talk to us instead of extending components if one doesn't meet their needs.",
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      useFinalDecorator:
        'Decorate your component with `@final` to prevent extension.',
    },
    schema: [],
    fixable: 'code',
  },
  defaultOptions: [],
  create(context) {
    return {
      ClassDeclaration(node) {
        const hasFinalDecorator = node.decorators.some(
          (node) =>
            node.expression.type === AST_NODE_TYPES.Identifier &&
            node.expression.name === 'final',
        );

        if (
          node.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.superClass.name === 'LitElement' &&
          !hasFinalDecorator
        ) {
          context.report({
            node,
            messageId: 'useFinalDecorator',
            fix(fixer) {
              const lastDecorator = node.decorators.at(-1);
              const classToken = context.sourceCode.getFirstToken(node);

              if (
                node.decorators &&
                node.decorators.length > 0 &&
                lastDecorator
              ) {
                const indent = ' '.repeat(lastDecorator.loc.start.column);

                return fixer.insertTextAfter(
                  lastDecorator,
                  `\n${indent}@final`,
                );
              } else if (classToken) {
                return fixer.insertTextBefore(classToken, '@final\n');
              } else {
                return null;
              }
            },
          });
        }
      },
    };
  },
});
