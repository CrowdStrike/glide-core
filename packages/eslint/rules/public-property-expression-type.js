"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.publicPropertyExpressionType = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.publicPropertyExpressionType = createRule({
    name: 'public-property-expression-type',
    meta: {
        docs: {
            description: 'Ensures a type annotation on public properties whose value is an expression.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            addExplicitType: 'Add a type annotation to help us populate our elements manifest with the correct type.',
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            PropertyDefinition(node) {
                const isPseudoPrivate = node.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.key.name.startsWith('private');
                if (node.value?.type === utils_1.AST_NODE_TYPES.MemberExpression &&
                    node.key.type !== utils_1.AST_NODE_TYPES.PrivateIdentifier &&
                    !isPseudoPrivate &&
                    !node.typeAnnotation) {
                    context.report({
                        node,
                        messageId: 'addExplicitType',
                    });
                }
            },
        };
    },
});
