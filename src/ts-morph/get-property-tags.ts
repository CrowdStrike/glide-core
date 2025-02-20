import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];
  const isMembers = 'members' in declaration;

  if (!isMembers) {
    return tags;
  }

  const properties = [...declaration.members]
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .filter((member) => {
      const isAttribute =
        'attributes' in declaration &&
        declaration.attributes.some(({ fieldName }) => {
          return fieldName === member.name;
        });

      // A hard-coded list is unfortunate. But we can't ignore all static
      // properties because some may be meant for public use.
      const isIgnore = ['formAssociated', 'shadowRootOptions'].includes(
        member.name,
      );

      const isPrivate =
        'privacy' in member || member.name.startsWith('private');

      return !isAttribute && !isIgnore && !isPrivate && member.kind === 'field';
    });

  for (const [index, property] of properties.entries()) {
    if ('readonly' in property && property.readonly) {
      tags.push({
        tagName: 'readonly',
        leadingTrivia(writer) {
          // Read-only attributes are multiline. So we pad them on top and bottom
          // with new lines.
          writer.newLine();
        },
      });
    }

    tags.push({
      tagName: 'prop',
      leadingTrivia(writer) {
        const isReadOnly = 'readonly' in property && property.readonly;
        writer.conditionalNewLine(!isReadOnly && index === 0);
      },
      text(writer) {
        writer.write(
          property.type
            ? `{${property.type.text}} ${property.name}`
            : `${property.name}`,
        );

        if (
          'description' in property &&
          typeof property.description === 'string'
        ) {
          // Multi-line comments are hard to read unless we indent them. Figured
          // doing so isn't worthwhile given the complexity of indenting them
          // correctly. So we simply reduce the comment to a single line.
          writer.write(` - ${property.description.replaceAll('\n', ' ')}`);
        }
      },
      trailingTrivia(writer) {
        const isCurrentPropertyReadOnly =
          'readonly' in property && property.readonly;

        const nextProperty = properties.at(index + 1);

        const isNextPropertyReadOnly =
          nextProperty && 'readonly' in nextProperty;

        // If the next property is read-only, it'll write a leading new
        // line for itself. Otherwise, if we were to write one here, a new
        // line will be inserted between `@readonly` and `@prop`.
        writer.conditionalNewLine(
          isCurrentPropertyReadOnly && nextProperty && !isNextPropertyReadOnly,
        );
      },
    });
  }

  return tags;
};
