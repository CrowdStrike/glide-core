"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slotTypeComment = void 0;
const utils_1 = require("@typescript-eslint/utils");
const node_html_parser_1 = require("node-html-parser");
const comment_parser_1 = require("comment-parser");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.slotTypeComment = createRule({
    name: 'slot-type-comment',
    meta: {
        docs: {
            description: 'Ensures slots have a `@type` comment.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            addSlotComment: 'Add a comment inside your slot and include a `@type` tag.',
            addSlotTypeComment: 'Add a `@type` tag to your slot comment.',
            addSlotTypeCommentType: "Add a type to your slot's `@type` tag. Check that the type is wrapped in curlies.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            TaggedTemplateExpression(node) {
                if (node.tag.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.tag.name === 'html') {
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
                    const root = (0, node_html_parser_1.parse)(markup, {
                        comment: true,
                    });
                    for (const slot of root.querySelectorAll('slot')) {
                        const comment = slot.childNodes.find((node) => {
                            return node instanceof node_html_parser_1.CommentNode;
                        });
                        if (!comment) {
                            context.report({
                                node: node.quasi,
                                messageId: 'addSlotComment',
                            });
                            return;
                        }
                        const tags = (0, comment_parser_1.parse)(`/** 
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
