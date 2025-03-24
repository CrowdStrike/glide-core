"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noNestedTemplateLiterals = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.noNestedTemplateLiterals = createRule({
    name: 'no-nested-template-literals',
    meta: {
        docs: {
            description: 'Forbids the use of a template literal inside of another template literal.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            noNestedTemplateLiterals: 'Nested template literals are not allowed.',
        },
        schema: [],
        fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
        return {
            TemplateLiteral(node) {
                for (const expression of node.expressions) {
                    if (expression.type === utils_1.AST_NODE_TYPES.TemplateLiteral) {
                        context.report({
                            node: expression,
                            messageId: 'noNestedTemplateLiterals',
                        });
                    }
                }
            },
        };
    },
});
