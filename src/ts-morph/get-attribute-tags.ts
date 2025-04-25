import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if (!declaration.attributes) {
    return tags;
  }

  const attributes = [...declaration.attributes].sort((a, b) => {
    // First required attributes sorted alphabetically. Then optional ones alphabetically.
    return 'required' in a && 'required' in b && a.name < b.name
      ? -1
      : 'required' in a && 'required' in b
        ? 1
        : 'required' in a
          ? -1
          : 'required' in b
            ? 1
            : a.name < b.name
              ? -1
              : 1;
  });

  for (const [index, attribute] of attributes.entries()) {
    if (attribute.name.startsWith('private')) {
      continue;
    }

    const type =
      typeof attribute.type?.text === 'string'
        ? attribute.type?.text
            .split('|')
            .map((type) => type.trim())
            .filter((type) => {
              // `type` is checked for truthiness because some multiline types start
              // with "|" courtesy of Prettier. For example: `@attr {|'true'|'false'}`.
              return type && type !== 'undefined';
            })
        : null;

    if ('readonly' in attribute && attribute.readonly) {
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
      tagName: 'attr',
      leadingTrivia(writer) {
        const currentAttributeHasReadOnly =
          'readonly' in attribute && attribute.readonly;

        // If the attribute is read-only, then it's already written a new line
        // for itself. If we were to write one here instead, a new would be
        // inserted between `@readonly` and `@attr`.
        writer.conditionalNewLine(!currentAttributeHasReadOnly && index === 0);
      },
      trailingTrivia(writer) {
        const currentAttributeHasReadOnly =
          'readonly' in attribute && attribute.readonly;

        // Private attribute are excluded from JSDoc comments. So we're only
        // interested in whether the next attribute that's public is read-only.
        // If it is, then we don't need to put a new line after it because it'll
        // write one for itself via `leadingTrivia()`.
        const nextPublicAttribute = attributes
          .slice(index + 1)
          .find(({ fieldName }) => !fieldName.startsWith('private'));

        const nextPublicAttributeHasReadOnly =
          nextPublicAttribute &&
          'readonly' in nextPublicAttribute &&
          nextPublicAttribute.readonly;

        // If the current attribute is read-only and the next attribute isn't, then
        // need we need a new line because read-only attributes are multiline.
        writer.conditionalNewLine(
          currentAttributeHasReadOnly &&
            nextPublicAttribute &&
            !nextPublicAttributeHasReadOnly,
        );
      },
      text(writer) {
        if (type) {
          writer.write(`{${type?.join('|')}} `);
        }

        if ('required' in attribute && attribute.required) {
          writer.write(attribute.name);
        } else if (
          'default' in attribute &&
          attribute.default &&
          attribute.default !== 'undefined'
        ) {
          writer.write(`[${attribute.name}=${attribute.default}]`);
        } else {
          writer.write(`[${attribute.name}]`);
        }

        if ('description' in attribute && attribute.description) {
          // Multi-line comments are hard to read unless we indent them. Figured
          // doing so isn't worthwhile given the complexity of indenting them
          // correctly. So we simply reduce the comment to a single line.
          writer.write(` - ${attribute.description.replaceAll('\n', ' ')}`);
        }
      },
    });
  }

  return tags;
};
