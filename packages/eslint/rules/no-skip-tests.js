"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noSkipTests = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.noSkipTests = createRule({
    name: 'no-skip-tests',
    meta: {
        docs: {
            description: 'Ensures tests are not skipped, as we do not want to accumulate a collection of skipped tests that never get addressed.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            noSkip: '".skip" is not allowed.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                if (node.arguments?.length > 0 &&
                    node.callee.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.callee.object.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.callee.object.name === 'it' &&
                    node.callee.property.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.callee.property.name === 'skip') {
                    context.report({
                        node: node,
                        messageId: 'noSkip',
                    });
                }
            },
        };
    },
});
