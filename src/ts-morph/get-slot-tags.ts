import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '@/custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];
  const isSlots = 'slots' in declaration;

  if (!isSlots) {
    return tags;
  }

  const slots = [...declaration.slots].sort((a, b) => {
    // Default slot first. Then the rest sorted alphabetically.
    return a.name === '' ? -1 : a.name < b.name ? -1 : 1;
  });

  for (const [index, slot] of slots.entries()) {
    tags.push({
      tagName: 'slot',
      leadingTrivia(writer) {
        writer.conditionalNewLine(index === 0);
      },
      text(writer) {
        const isTyped = 'text' in slot.type && slot.type.text;
        const isRequired = 'required' in slot && slot.required;

        if (isTyped && slot.name) {
          writer.write(
            isRequired
              ? `{${slot.type.text}} ${slot.name}`
              : `{${slot.type.text}} [${slot.name}]`,
          );
        } else if (slot.name) {
          writer.write(isRequired ? `${slot.name}` : `[${slot.name}]`);
        } else if (isTyped) {
          writer.write(`{${slot.type.text}}`);
        }

        if (slot.description) {
          // Multi-line comments are hard to read unless we indent them. Figured
          // doing so isn't worthwhile given the complexity of indenting them
          // correctly. So we simply reduce the comment to a single line.
          //
          // Some slot comments additionally quote code using backticks. Because
          // the backticks are inside tagged templates, they have to be escaped.
          // We unescape them so they show up as code on hover.
          writer.write(
            ` - ${slot.description
              .replaceAll('\n', '')
              // Remove backticks preceded by a backslash.
              .replaceAll(/\\(?=`)/g, '')}`,
          );
        }
      },
    });
  }

  return tags;
};
