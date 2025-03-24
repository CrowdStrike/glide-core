"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringEventName = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.stringEventName = createRule({
    name: 'string-event-name',
    meta: {
        docs: {
            description: 'Ensures events names are strings.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            stringEventName: 'Use a string for the event name to help us populate our elements manifest with events.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            NewExpression(node) {
                const isRelevantConstructor = node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    ['Event', 'CustomEvent'].includes(node.callee.name);
                if (isRelevantConstructor &&
                    node.arguments.at(0)?.type !== utils_1.AST_NODE_TYPES.Literal) {
                    context.report({
                        node,
                        messageId: 'stringEventName',
                    });
                }
            },
        };
    },
});
