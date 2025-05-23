import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import { parse as htmlParser, CommentNode } from 'node-html-parser';
import { parse as commentParser } from 'comment-parser';

const createRule = ESLintUtils.RuleCreator((name) => {
  return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});

export const slotTypeComment = createRule({
  name: 'slot-type-comment',
  meta: {
    docs: {
      description: 'Ensures slots have a `@type` comment.',
    },
    type: 'suggestion',
    messages: {
      addSlotComment:
        'Add a comment inside your slot and include a `@type` tag.',
      addSlotTypeComment: 'Add a `@type` tag to your slot comment.',
      addSlotTypeCommentType:
        "Add a type to your slot's `@type` tag. Check that the type is wrapped in curlies.",
    },
    schema: [],
  },
  defaultOptions: [],
  create(context) {
    return {
      TaggedTemplateExpression(node) {
        if (
          node.tag.type === AST_NODE_TYPES.Identifier &&
          node.tag.name === 'html'
        ) {
          // Reducers are often inscrutable. But I thought this was a good case for
          // one.
          //
          // A quasi is the string part of a template literal. When a template literal
          // contains an expression, it's broken into a array of quasis, which we then
          // have to recombine to get the entirety of the markup.
          //
          // eslint-disable-next-line unicorn/no-array-reduce
          const markup = node.quasi.quasis.reduce((accumulator, quasi) => {
            accumulator += quasi.value.raw;
            return accumulator;
          }, '');

          const root = htmlParser(markup, {
            comment: true,
          });

          for (const slot of root.querySelectorAll('slot')) {
            const comment = slot.childNodes.find((node) => {
              return node instanceof CommentNode;
            });

            if (!comment) {
              context.report({
                node: node.quasi,
                messageId: 'addSlotComment',
              });

              return;
            }

            const tags = commentParser(`/**
                ${comment.rawText}
              */`).flatMap((block) => block.tags);

            const typeTag = tags.find((tag) => tag.tag === 'type');

            if (!typeTag) {
              context.report({
                node: node.quasi,
                messageId: 'addSlotTypeComment',
              });

              return;
            }

            if (typeTag.type === '') {
              context.report({
                node: node.quasi,
                messageId: 'addSlotTypeCommentType',
              });

              return;
            }
          }
        }
      },
    };
  },
});
