import { isClassDeclaration, type Node } from 'typescript';

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
export default () => {
  return {
    name: 'remove-comments',
    collectPhase({ node }: { node: Node }) {
      // We're only interested in class JSDocs because class members can have
      // comments too. And those we need to keep. The default return types of
      // getters, for example, are specified in JSDocs comments because they're
      // otherwise difficult to determine.
      if (isClassDeclaration(node) && 'jsDoc' in node) {
        node.jsDoc = [];
      }
    },
  };
};
