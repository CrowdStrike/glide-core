import { type Module } from 'custom-elements-manifest';
import { type Node } from 'typescript';
/**
 * Adds to every attribute in the manifest a `required` property if
 * the attribute has a `@required` decorator.
 */
declare const _default: () => {
    name: string;
    analyzePhase({ moduleDoc, node }: {
        moduleDoc: Module;
        node: Node;
    }): void;
};
export default _default;
