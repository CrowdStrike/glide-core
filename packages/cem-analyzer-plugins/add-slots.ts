import { type Module } from 'custom-elements-manifest' with { type: 'json' };
import { parse as htmlParser, CommentNode } from 'node-html-parser';
import { parse as commentParser } from 'comment-parser';
import {
  isReturnStatement,
  isTaggedTemplateExpression,
  type Node,
} from 'typescript';
import getParentClassName from '../library/get-parent-class-name.js';

/**
 * Adds slots to the manifest.
 *
 * 1. Find `html` tagged templates.
 * 2. Parse their markup.
 * 3. Get the slots from the markup.
 * 4. Gets the comments in each slot.
 * 5. Parse the first comment as a JSDoc.
 * 6. Get the JSDoc tags from the comment.
 * 7. Filter out slots with an `@ignore` tag.
 * 8. Find the corresponding declaration in the manifest.
 * 9. Add each slot to the declaration.
 */
export default () => {
  return {
    name: 'add-slots',
    analyzePhase({ moduleDoc, node }: { moduleDoc: Module; node: Node }) {
      if (
        isTaggedTemplateExpression(node) &&
        isReturnStatement(node.parent) &&
        node.tag.getText() === 'html' &&
        moduleDoc.declarations
      ) {
        const slots = htmlParser(node.template.getText(), {
          comment: true,
        })
          .querySelectorAll('slot')
          .map((slot) => {
            // We only support comments inside slots instead of right above them
            // because previous sibling comment nodes appear to be impossible to
            // get using `node-html-parser`. Cheerio, meanwhile, has a clunky API
            // and doesn't make it easy to get them. Admittedly, comments in slots
            // are a bit unnatural. But they do the job.
            const comment = slot.childNodes.find((node) => {
              return node instanceof CommentNode;
            });

            if (!comment) {
              return {
                name: slot.getAttribute('name') ?? '',
              };
            }

            const block = commentParser(`/** 
                  ${comment.rawText} 
                */`).at(0);

            return {
              name:
                block?.tags.find((tag) => tag.tag === 'name')?.name ??
                slot.getAttribute('name') ??
                '',
              description: block?.description,
              ignore: block?.tags.find((tag) => tag.tag === 'ignore'),
              required: block?.tags.find((tag) => tag.tag === 'required'),
              type: {
                text: block?.tags.find((tag) => tag.tag === 'type')?.type,
              },
            };
          })
          .filter((slot): slot is NonNullable<typeof slot> => {
            // `slot.name` is either a string or undefined. If it's a string
            // and a default slot, then it's an empty string. Thus an `undefined`
            // check instead of a falsy one.
            return slot?.name !== undefined && !slot?.ignore;
          });

        for (const declaration of moduleDoc.declarations) {
          if (
            getParentClassName(node) === declaration.name &&
            'slots' in declaration &&
            declaration.slots
          ) {
            for (const slot of slots) {
              const isNew = declaration.slots.every(
                ({ name }) => name !== slot.name,
              );

              // Some components, like DropdownOption, have multiple slots with
              // the same name.
              if (isNew) {
                declaration.slots.push(slot);
              }
            }
          }
        }
      }
    },
  };
};
