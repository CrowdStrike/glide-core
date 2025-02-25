import { type Package } from 'custom-elements-manifest' with { type: 'json' };

/**
 * Removes private members from the manifest.
 *
 * Private members are unused and changes to them create unnecessary
 * diffs in code reviews and merge conflicts.
 */
export default () => {
  return {
    name: 'remove-private-members',
    packageLinkPhase({
      customElementsManifest,
    }: {
      customElementsManifest: Package;
    }) {
      for (const module of customElementsManifest.modules) {
        if (module.declarations) {
          for (const declaration of module.declarations) {
            if ('members' in declaration && declaration.members) {
              declaration.members = declaration.members.filter((member) => {
                const isAttribute = 'attribute' in member && member.attribute;

                if (isAttribute) {
                  // Every attribute is public by definition. But even pseudo-private
                  // attributes are meant to be used, if only by our other components.
                  // Those components might not get past the typechecker if we filtered
                  // out pseudo-private attributes.
                  return true;
                }

                return (
                  member.privacy !== 'private' &&
                  !member.name.startsWith('private')
                );
              });
            }
          }
        }
      }
    },
  };
};
