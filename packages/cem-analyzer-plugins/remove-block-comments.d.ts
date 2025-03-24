import { type Node } from 'typescript';
/**
 * Removes existing JSDocs from the manifest's AST.
 *
 * The analyzer picks up all sorts of things automatically. It parses
 * components and, among other things, looks at each component's JSDocs.
 *
 * But just because something is in a component's JSDoc doesn't mean it's
 * correct or exists. A developer, for example, may add a `@slot` comment,
 * then later forget to remove it after removing the slot.
 *
 * So we start fresh.
 */
declare const _default: () => {
    name: string;
    collectPhase({ node }: {
        node: Node;
    }): void;
};
export default _default;
