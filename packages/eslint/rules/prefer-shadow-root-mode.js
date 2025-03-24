"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preferClosedShadowRoot = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.preferClosedShadowRoot = createRule({
    name: 'prefer-shadow-root-mode',
    meta: {
        docs: {
            description: 'Ensures Glide Components conditionally open and close their shadow roots.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            missingShadowRootOptions: 'Prefer overriding shadow root options.',
            missingMode: 'Prefer setting `mode` on `shadowRootOptions`.',
            wrongMode: "Prefer setting `mode` on `shadowRootOptions` to `shadowRootMode`. Import `shadowRootMode` from 'src/library/shadow-root-mode.ts'.",
        },
        schema: [],
    },
    defaultOptions: [],
    create(context) {
        return {
            ClassDeclaration(node) {
                if (node.superClass?.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.superClass.name === 'LitElement') {
                    const shadowRootOptions = node.body?.body?.find((body) => body.type === utils_1.AST_NODE_TYPES.PropertyDefinition &&
                        body.static === true &&
                        body.override === true &&
                        body.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                        body.key.name === 'shadowRootOptions');
                    if (!shadowRootOptions) {
                        context.report({
                            node,
                            messageId: 'missingShadowRootOptions',
                        });
                    }
                }
            },
            PropertyDefinition(node) {
                if (node.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.key.name === 'shadowRootOptions') {
                    const shadowRootMode = node.value?.type === utils_1.AST_NODE_TYPES.ObjectExpression &&
                        node.value.properties?.find((property) => property.type === utils_1.AST_NODE_TYPES.Property &&
                            property.key.type === utils_1.AST_NODE_TYPES.Identifier &&
                            property.key.name === 'mode');
                    if (!shadowRootMode) {
                        context.report({
                            node,
                            messageId: 'missingMode',
                        });
                        return;
                    }
                    const isUsingShadowRootModeLibrary = shadowRootMode &&
                        shadowRootMode.type === utils_1.AST_NODE_TYPES.Property &&
                        shadowRootMode.value.type === utils_1.AST_NODE_TYPES.Identifier &&
                        shadowRootMode.value.name === 'shadowRootMode';
                    if (!isUsingShadowRootModeLibrary) {
                        context.report({
                            node,
                            messageId: 'wrongMode',
                        });
                    }
                }
            },
        };
    },
});
