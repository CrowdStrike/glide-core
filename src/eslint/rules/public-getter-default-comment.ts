import {
  AST_NODE_TYPES,
  AST_TOKEN_TYPES,
  ESLintUtils,
} from '@typescript-eslint/utils';
import { parse as commentParser } from 'comment-parser';

// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = ESLintUtils.RuleCreator<{
  recommended: boolean;
}>((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const publicGetterDefaultComment = createRule({
  name: 'public-getter-default-comment',
  meta: {
    docs: {
      description:
        'Ensures getters that have setters have a comment with `@default` tag.',
      recommended: true,
    },
    type: 'suggestion',
    messages: {
      addDefaultTag:
        'Add a "@default" tag to your comment help us populate our elements manifest with the correct default type.',
      addCommentAndDefaultTag:
        'Add a JSDoc comment with a "@default" tag to help us populate our elements manifest with the correct default type.',
      useJsDocComment:
        'Use a JSDoc-style comment to help us populate our elements manifest with the correct default type.',
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    const comments = context.sourceCode.getAllComments();

    return {
      MethodDefinition(node) {
        const isPseudoPrivate =
          node.key.type === AST_NODE_TYPES.Identifier &&
          node.key.name.startsWith('private');

        const hasSetter = node.parent.body.some((classElement) => {
          return (
            node.key.type === AST_NODE_TYPES.Identifier &&
            node.kind === 'get' &&
            classElement.type === AST_NODE_TYPES.MethodDefinition &&
            classElement.kind === 'set' &&
            classElement.key.type === AST_NODE_TYPES.Identifier &&
            classElement.key.name === node.key.name
          );
        });

        if (
          node.parent.type === AST_NODE_TYPES.ClassBody &&
          node.parent.parent.type === AST_NODE_TYPES.ClassDeclaration &&
          node.parent.parent.superClass?.type === AST_NODE_TYPES.Identifier &&
          node.parent.parent.superClass.name === 'LitElement' &&
          node.kind === 'get' &&
          node.key.type !== AST_NODE_TYPES.PrivateIdentifier &&
          node.accessibility !== 'private' &&
          hasSetter &&
          !isPseudoPrivate &&
          !node.override
        ) {
          const comment = comments.find(({ loc, type }) => {
            return (
              type === AST_TOKEN_TYPES.Block &&
              loc.end.line === node.loc.start.line - 1
            );
          });

          if (comment) {
            const parsed = commentParser(`/** 
              ${comment.value} 
            */`);

            const hasDefaultTag = parsed.at(0)?.tags.some((tag) => {
              return tag.tag === 'default';
            });

            /*
             * This is block comment. But it's not a JSDoc one.
             */

            /**
             * This is a JSDoc one.
             */
            if (hasDefaultTag && !comment.value.startsWith('*')) {
              context.report({
                node,
                messageId: 'useJsDocComment',
              });
            }

            if (!hasDefaultTag) {
              context.report({
                node,
                messageId: 'addDefaultTag',
              });
            }

            return;
          }

          context.report({
            node,
            messageId: 'addCommentAndDefaultTag',
          });
        }
      },
    };
  },
});
