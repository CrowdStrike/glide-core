import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109

const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const privateStateDecorators = createRule({
  name: 'private-state-decorators',
  meta: {
    docs: {
      description: 'Ensures fields decorated with `@state()` are private.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      privateStateDecorators:
        "`@state()` is meant for fields only used by a component internally. Add the `private` keyword to the field if that's the case. Otherwise, decorate the field with `@property()` instead.",
    },
    schema: [],
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
      PropertyDefinition(node) {
        if (!isComponent) {
          return;
        }

        const hasStateDecorator = node.decorators.some((node) => {
          return (
            node.expression.type === AST_NODE_TYPES.CallExpression &&
            node.expression.callee.type === AST_NODE_TYPES.Identifier &&
            node.expression.callee.name === 'state'
          );
        });

        if (hasStateDecorator && node.accessibility !== 'private') {
          // This is easy enough to autofix. But autofixing it will probably frustrate
          // developers.
          //
          // For example, it's common for developers to decorate with `@state()` a field
          // in a subcomponent then modify that field in its controlling component. Think
          // of a case like Dropdown modifying a field on Dropdown Option.
          //
          // The `private` keyword would be added to Dropdown Option's field on save,
          // presumably. Then Dropdown, to the developer's surprise, would fail to
          // typecheck because the developer didn't notice the `private` keyword was added
          // automatically.
          //
          // And we can't know the developer's intention without analyzing other code,
          // including code outside the component in question. Is the field decorated with
          // `@state()` only used in the component and thus safe to mark as private? Or is
          // it used externally and better decorated with `@property()` instead?
          context.report({
            node,
            messageId: 'privateStateDecorators',
          });
        }
      },
    };
  },
});
