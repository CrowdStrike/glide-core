"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noToHaveAttribute = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.noToHaveAttribute = createRule({
    name: 'no-to-have-attribute',
    meta: {
        docs: {
            description: 'Using `.to.have.attribute()` causes tests to hang when it is falsy, so we should not use it.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            noToHaveAttribute: 'Prefer using `.hasAttribute()` or `.getAttribute()` instead of `.to.have.attribute()`.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            MemberExpression(node) {
                if (node.object.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.object.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.object.property.name === 'to' &&
                    node.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.property.name === 'have' &&
                    node.parent &&
                    node.parent.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.parent.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.parent.property.name === 'attribute') {
                    context.report({
                        node,
                        messageId: 'noToHaveAttribute',
                    });
                }
            },
        };
    },
});
