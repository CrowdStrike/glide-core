"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consistentReferenceElementDeclarations = void 0;
const utils_1 = require("@typescript-eslint/utils");
// https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/developers/Custom_Rules.mdx?plain=1#L109
const createRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/CrowdStrike/glide-core/blob/main/src/eslint/rules/${name}.ts`);
exports.consistentReferenceElementDeclarations = createRule({
    name: 'consistent-reference-element-declarations',
    meta: {
        docs: {
            description: 'Ensures Lit references use JavaScript private fields and end with "ElementRef" in their variable declarations.',
            recommended: true,
        },
        type: 'suggestion',
        messages: {
            addSuffix: 'Prefer Lit reference variable declarations to end with "ElementRef" (e.g., "#buttonRef" → "#buttonElementRef").',
            preferPrivateField: 'Prefer Lit reference variable declarations to be a JavaScript private field (e.g., "buttonElementRef" → "#buttonElementRef").',
        },
        schema: [],
        fixable: 'code',
    },
    defaultOptions: [],
    create(context) {
        return {
            PropertyDefinition(node) {
                if (node?.value?.type === utils_1.AST_NODE_TYPES.CallExpression &&
                    node.value.callee.type === utils_1.AST_NODE_TYPES.Identifier &&
                    node.value.callee.name === 'createRef') {
                    if (node.key.type !== utils_1.AST_NODE_TYPES.PrivateIdentifier) {
                        context.report({ node, messageId: 'preferPrivateField' });
                    }
                    if (
                    // Checking for Identifier here as well as PrivateIdentifier ensures that we can group both
                    // errors together in a single lint by throwing both types of errors (if applicable)
                    (node.key.type === utils_1.AST_NODE_TYPES.PrivateIdentifier ||
                        node.key.type === utils_1.AST_NODE_TYPES.Identifier) &&
                        !node.key.name.endsWith('ElementRef')) {
                        context.report({
                            node,
                            messageId: 'addSuffix',
                        });
                    }
                }
            },
        };
    },
});
