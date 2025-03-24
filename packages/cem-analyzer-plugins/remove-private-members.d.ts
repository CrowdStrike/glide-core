import { type Package } from 'custom-elements-manifest';
/**
 * Removes private members from the manifest.
 *
 * Private members are unused and changes to them create unnecessary
 * diffs in code reviews and merge conflicts.
 */
declare const _default: () => {
    name: string;
    packageLinkPhase({ customElementsManifest, }: {
        customElementsManifest: Package;
    }): void;
};
export default _default;
