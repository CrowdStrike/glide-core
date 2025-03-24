import { type Module } from 'custom-elements-manifest';
import { type Node } from 'typescript';
/**
 * Adds slots to the manifest.
 *
 * 1. Find `html` tagged templates.
 * 2. Parse their markup.
 * 3. Get the slots from the markup.
 * 4. Gets the comments in each slot.
 * 5. Parse the first comment as a JSDoc.
 * 6. Get the JSDoc tags from the comment.
 * 7. Filter out slots with an `@ignore` tag.
 * 8. Find the corresponding declaration in the manifest.
 * 9. Add each slot to the declaration.
 */
declare const _default: () => {
    name: string;
    analyzePhase({ moduleDoc, node }: {
        moduleDoc: Module;
        node: Node;
    }): void;
};
export default _default;
