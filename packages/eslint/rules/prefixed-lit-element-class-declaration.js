"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prefixedClassDeclaration = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => {
    return `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`;
});
exports.prefixedClassDeclaration = createRule({
    name: 'prefixed-lit-element-class-declaration',
    meta: {
        docs: {
            description: 'Ensures all web components that extend a LitElement are prefixed with "GlideCore".',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            addPrefix: 'Prefer elements extending LitElement to be prefixed with "GlideCore".',
        },
        schema: [],
        fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
        return {
            ClassDeclaration(node) {
                if (node.id?.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.superClass?.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.superClass?.name === 'LitElement' &&
                    !node.id?.name?.startsWith('GlideCore')) {
                    context.report({
                        node,
                        messageId: 'addPrefix',
                        fix(fixer) {
                            const nodeId = node.id;
                            if (!nodeId) {
                                // eslint-disable-next-line no-console
                                console.error(`Error attempting to lint fix "prefixed-lit-element-class-declaration at nodeId: ${nodeId}". Please report this error to @crowdstrike/glide-core.`);
                                return null;
                            }
                            return fixer.replaceText(nodeId, `GlideCore${node.id?.name}`);
                        },
                    });
                }
            },
        };
    },
});
