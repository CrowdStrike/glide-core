import { Project } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };
import getAttributeTags from './get-attribute-tags.js';
import getCssPropertyTags from './get-css-property-tags.js';
import getPropertyTags from './get-property-tags.js';
import getSlotTags from './get-slot-tags.js';
import getEventTags from './get-event-tags.js';
import getMethodTags from './get-method-tags.js';

const project = new Project();

project.addSourceFilesAtPaths([
  './src/*.ts',
  './src/*.*.ts',
  '!**/*stories*',
  '!**/*styles*',
  '!**/*test*',
]);

for (const file of project.getSourceFiles()) {
  for (const node of file.getClasses()) {
    if (node.getBaseClass()?.getName() === 'LitElement') {
      const declaration = manifest.modules
        // Find all the custom element declarations.
        ?.flatMap((module) => {
          return module.declarations?.find((declaration) => {
            return declaration.customElement;
          });
        })
        // Now find the custom element declaration for the node in question.
        ?.find((declaration) => {
          return (
            declaration &&
            'name' in declaration &&
            declaration.name === node.getName()
          );
        });

      if (declaration) {
        const tags = [
          // Attributes at the top because some are required and everyone
          // uses them. Then slots for the same reason.
          //
          // Custom properties are few and could get lost in the noise. So
          // they're next. Then events because they're also commonly used.
          ...getAttributeTags(declaration),
          ...getSlotTags(declaration),
          ...getCssPropertyTags(declaration),
          ...getEventTags(declaration),
          ...getPropertyTags(declaration),
          ...getMethodTags(declaration),
        ];

        node.set({
          docs:
            tags.length > 0
              ? [
                  {
                    tags,
                  },
                ]
              : [],
        });
      }
    }
  }
}

await project.save();
