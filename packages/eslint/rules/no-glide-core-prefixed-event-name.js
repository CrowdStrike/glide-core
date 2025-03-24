"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.noPrefixedEventName = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.noPrefixedEventName = createRule({
    name: 'no-glide-core-prefixed-event-name',
    meta: {
        docs: {
            description: 'Removes the "glide-core-" prefix from an Event or CustomEvent type.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            noPrefix: 'Prefer using event names without the "glide-core-" prefix when constructing an Event or CustomEvent. Please remove it.',
        },
        schema: [],
        fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
        return {
            NewExpression(node) {
                const isEvent = node.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    ['Event', 'CustomEvent'].includes(node.callee.name);
                if (isEvent &&
                    node.arguments.length > 0 &&
                    node.arguments[0]?.type === utils_1.AST_NODE_TYPES.Literal &&
                    typeof node.arguments[0].value === 'string' &&
                    node.arguments[0].value.startsWith('glide-core-')) {
                    const eventName = node.arguments[0].value.toString();
                    context.report({
                        node,
                        messageId: 'noPrefix',
                        fix(fixer) {
                            return fixer.replaceText(node.arguments[0], `'${eventName.replace('glide-core-', '')}'`);
                        },
                    });
                }
            },
        };
    },
});
