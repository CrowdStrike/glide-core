import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';

const createRule = ESLintUtils.RuleCreator<{
  // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L110
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const publicMemberReturnType = createRule({
  name: 'public-member-return-type',
  meta: {
    docs: {
      description:
        'Ensures a return type annotation on public methods and getters with setters.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      addReturnType:
        'Add a return type annotation to help us populate our elements manifest with the correct type.',
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
