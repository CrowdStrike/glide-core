import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const explicitPublicMemberReturnType = createRule({
  name: 'explicit-public-member-return-type',
  meta: {
    docs: {
      description:
        'Ensures an explicit return type on public method and getters.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      addReturnType:
        'Add an explicit return type to help us populate our elements manifest with the correct return type.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      MethodDefinition(node) {
        const isPseudoPrivate =
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.key.name.startsWith('private');

        if (
          node.parent.type === AST_NODE_TYPES.ClassBody &&
          node.parent.parent.type === AST_NODE_TYPES.ClassDeclaration &&
          node.parent.parent.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.parent.parent.superClass.name === 'LitElement' &&
          node.kind !== 'constructor' &&
          node.kind !== 'set' &&
          node.key.type !== AST_NODE_TYPES.PrivateIdentifier &&
          node.accessibility !== 'private' &&
          !node.override &&
          !node.value.returnType &&
          !isPseudoPrivate
        ) {
          context.report({
            node,
            messageId: 'addReturnType',
          });
        }
      },
    };
  },
});
