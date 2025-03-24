import { type Module } from 'custom-elements-manifest';
import { type Node } from 'typescript';
/**
 * Adds custom properties to the manifest. Custom properties inside `:host`
 * selectors are considered public and added. Other custom properties are
 * ignored.
 *
 * Collect
 *
 * 1. Get the styles from every component stylesheet.
 * 2. Parse the styles.
 * 3. Find all the custom properties inside `:host` selectors.
 * 4. Add each custom property to `context.stylesheets`.
 *
 * Analyze
 *
 * 1. Get the file path of each component's stylesheet import.
 * 2. Look up the file path in `context.stylesheets`.
 * 3. Add every custom property found in `context.stylesheets` to the manifest.
 */
declare const _default: () => {
    name: string;
    collectPhase({ context, node, }: {
        context: {
            stylesheets?: Record<string, [{
                name: string;
                default: string;
                description?: string;
            }]>;
        };
        node: Node;
    }): void;
    analyzePhase({ context, moduleDoc, node, }: {
        context: {
            stylesheets?: Record<string, [{
                name: string;
                default: string;
                description?: string;
            }]>;
        };
        moduleDoc: Module;
        node: Node;
    }): void;
};
export default _default;
