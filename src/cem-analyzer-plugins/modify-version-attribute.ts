import { type Module } from 'custom-elements-manifest' with { type: 'json' };
import packageJson from '../../package.json' with { type: 'json' };

/**
 * Modifies `version` attributes in the manifest to be a string-
 * constant equal to the current package version.
 */
export default () => {
  return {
    name: 'modify-version-attribute',
    analyzePhase({ moduleDoc }: { moduleDoc: Module }) {
      if (moduleDoc.declarations) {
        for (const declaration of moduleDoc.declarations) {
          if ('attributes' in declaration && declaration.attributes) {
            for (const attribute of declaration.attributes) {
              if (attribute.name === 'version') {
                attribute.type = {
                  text: packageJson.version,
                };
              }
            }
          }
        }
      }
    },
  };
};
