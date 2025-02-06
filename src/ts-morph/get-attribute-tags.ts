import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if (
    !('attributes' in declaration) ||
    !Array.isArray(declaration.attributes)
  ) {
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
              // `type` is first checked for its truthiness because some multiline types
              // start with "|" courtesy of Prettier. For example: `@attr {|'true'|'false'}`.
              return type && type !== 'undefined';
            })
        : null;

    if ('readonly' in attribute && attribute.readonly) {
      tags.push({
        tagName: 'readonly',
      });
    }

    tags.push({
      tagName: 'attr',
      text(writer) {
        if (type) {
          writer.write(`{${type?.join('|')}} `);
        }

        const isRequired = 'required' in attribute && attribute.required;

        const hasDefault =
          'default' in attribute &&
          attribute.default &&
          attribute.default !== 'undefined';

        if (isRequired) {
          writer.write(attribute.name);
        } else if (hasDefault) {
          writer.write(`[${attribute.name}=${attribute.default}]`);
        } else {
          writer.write(`[${attribute.name}]`);
        }

        const hasDescription =
          'description' in attribute && attribute.description;

        if (hasDescription) {
          // Multi-line comments are hard to read unless we indent them. Figured
          // the juice isn't worth the squeeze given the complexity of indenting
          // them just so. So we reduce the comment to a single line.
          writer.write(` - ${attribute.description.replaceAll('\n', '')}`);
        }

        const isLastAttribute = attribute === attributes.at(-1);
        const nextAttribute = attributes[index + 1];

        const isNextAttributeReadOnly =
          nextAttribute &&
          'readonly' in nextAttribute &&
          nextAttribute.readonly;

        if (!isLastAttribute && isNextAttributeReadOnly) {
          writer.newLine();
        }
      },
    });
  }

  return tags;
};
