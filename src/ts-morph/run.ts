import { Project } from 'ts-morph';
import getAttributeTags from './get-attribute-tags.js';
import getCssPropertyTags from './get-css-property-tags.js';
import getPropertyTags from './get-property-tags.js';
import getSlotTags from './get-slot-tags.js';
import getEventTags from './get-event-tags.js';
import getMethodTags from './get-method-tags.js';
import manifest from '@/custom-elements.json' with { type: 'json' };

/**
 * Uses the information in the elements manifest to add a top-level JSDoc
 * comment to every component.
 */
const project = new Project();

project.addSourceFilesAtPaths([
  './src/*.ts',
  './src/*.*.ts',
  '!**/*stories*',
  '!**/*styles*',
  '!**/*test*',
]);

let isSave = false;

for (const file of project.getSourceFiles()) {
  for (const node of file.getClasses()) {
    if (node.getBaseClass()?.getName() === 'LitElement') {
      const declaration = manifest.modules
        // Get all the custom element declarations.
        ?.flatMap((module) => {
          return module.declarations?.find((declaration) => {
            return declaration.customElement;
          });
        })
        // Now find the declaration for the node in question.
        ?.find((declaration) => {
          return (
            declaration &&
            'name' in declaration &&
            declaration.name === node.getName()
          );
        });

      if (declaration) {
        const tags = [
          // Attributes at the top because some are required and everyone uses
          // them. Then slots for the same reason.
          //
          // Custom properties are rare and could get lost in the noise. So they're
          // next. Then events because they're commonly used but optional. Then the
          // rest.
          ...getAttributeTags(declaration),
          ...getSlotTags(declaration),
          ...getCssPropertyTags(declaration),
          ...getEventTags(declaration),
          ...getPropertyTags(declaration),
          ...getMethodTags(declaration),
        ];

        const currentComment = node.getJsDocs().at(0)?.getText();

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

        const newComment = node.getJsDocs().at(0)?.getText();

        if (currentComment !== newComment) {
          isSave = true;
        }
      }
    }
  }
}

// Conditionlly saving lets us watch `./custom-elements.json` in
// `start:development:ts-morph` without a loop.
//
// Otherwise, a change to a component would trigger a write to
// `./custom-elements.json` via `start:development:cem-analyze`.
//
// Then `start:development:ts-morph` would run and write the component's
// file again, which would cause `start:development:cem-analyze` to run
// again.
if (isSave) {
  await project.save();
}
