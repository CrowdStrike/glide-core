import { type Module } from 'custom-elements-manifest';
import { type Node } from 'typescript';
/**
 * Adds dispatched events to the manifest.
 *
 * 1. Add "invalid" events to the manifest if a class implements `FormControl`.
 * 2. Add events found in `this.dispatchEvent` calls.
 *
 * Events dispatched from within class methods are picked up without the help of
 * a plugin. But events dispatched from getters and setters are not because only¹
 * methods are visited.
 *
 * "invalid" events aren't picked up either. The authors of the analyzer library
 * would have no way to do so reliably.
 *
 * If not for the above cases, we wouldn't need this plugin.
 *
 * 1: https://github.com/open-wc/custom-elements-manifest/blob/e7ec7424aa418b220fc4ec7e70464b4d6f35b596/packages/analyzer/src/features/analyse-phase/creators/createClass.js#L151-L153
 */
declare const _default: () => {
    name: string;
    analyzePhase({ moduleDoc, node }: {
        moduleDoc: Module;
        node: Node;
    }): void;
};
export default _default;
