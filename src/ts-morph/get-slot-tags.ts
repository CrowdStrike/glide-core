import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if (
    'slots' in declaration &&
    declaration.slots &&
    declaration.slots.length > 0
  ) {
    const slots = [...declaration.slots].sort((a, b) => {
      // Default slot first. The rest sorted alphabetically.
      return a.name === '' ? -1 : a.name < b.name ? -1 : 1;
    });

    for (const slot of slots) {
      tags.push({
        tagName: 'slot',
        leadingTrivia(writer) {
          writer.conditionalNewLine(slot === slots.at(0));
        },
        text(writer) {
          const isTyped =
            'type' in slot &&
            typeof slot.type === 'object' &&
            'text' in slot.type &&
            typeof slot.type.text === 'string';

          if (isTyped && slot.name) {
            const isRequired = 'required' in slot && slot.required;

            writer.write(
              isRequired
                ? `{${slot.type.text}} ${slot.name}`
                : `{${slot.type.text}} [${slot.name}]`,
            );
          } else if (slot.name) {
            writer.write(
              'required' in slot && slot.required
                ? `${slot.name}`
                : `[${slot.name}]`,
            );
          } else if (isTyped) {
            writer.write(`{${slot.type.text}}`);
          }

          const hasDescription =
            'description' in slot &&
            typeof slot.description === 'string' &&
            slot.description.length > 0;

          if (hasDescription) {
            // Multi-line comments are hard to read unless we indent them. Figured
            // the juice isn't worth the squeeze given the complexity of indenting
            // them just so. So we reduce the comment to a single line.
            //
            // Some slot comments additionally quote code using backticks. Because
            // the backticks are inside tagged templates, they have to be escaped.
            // Now we unescape them so they show up as code.
            writer.write(
              ` - ${slot.description
                .replaceAll('\n', '')
                .replaceAll(/\\(?=`)/g, '')}`,
            );
          }
        },
      });
    }
  }

  return tags;
};
