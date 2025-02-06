import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const publicMemberReturnType = createRule({
  name: 'public-member-return-type',
  meta: {
    docs: {
      description:
        'Ensures an explicit return type on public methods and getters with setters.',
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
          node.kind !== 'constructor' &&
          node.kind !== 'set' &&
          node.key.type !== AST_NODE_TYPES.PrivateIdentifier &&
          node.accessibility !== 'private' &&
          !isPseudoPrivate &&
          !node.override &&
          !node.value.returnType
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
