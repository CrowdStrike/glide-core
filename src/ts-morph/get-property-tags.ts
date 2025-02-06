import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if (
    'members' in declaration &&
    declaration.members &&
    declaration.members.length > 0
  ) {
    const properties = [...declaration.members]
      .filter((member) => {
        const isAttribute =
          'attributes' in declaration &&
          declaration.attributes?.some(({ fieldName }) => {
            return fieldName === member.name;
          });

        const isUninteresting = [
          'formAssociated',
          'shadowRootOptions',
        ].includes(member.name);

        const isPrivate =
          'privacy' in member || member.name.startsWith('private');

        return (
          !isAttribute &&
          !isUninteresting &&
          !isPrivate &&
          member.kind === 'field'
        );
      })
      .sort((a, b) => (a.name < b.name ? -1 : 1));

    for (const [index, property] of properties.entries()) {
      if ('readonly' in property && property.readonly) {
        tags.push({
          tagName: 'readonly',
          leadingTrivia(writer) {
            writer.newLine();
          },
        });
      }

      tags.push({
        tagName: 'prop',
        leadingTrivia(writer) {
          const isPropertyReadOnly =
            'readonly' in property && property.readonly;

          // TODO: say why. same as below. because next property necessarily has to provide its own leading new line.
          if (property === properties.at(0) && !isPropertyReadOnly) {
            writer.newLine();
          }
        },

        trailingTrivia(writer) {
          const isThisPropertyReadOnly =
            'readonly' in property && property.readonly;

          const nextProperty = properties[index + 1];

          const isNextPropertyReadOnly =
            nextProperty && 'readonly' in nextProperty;

          if (
            isThisPropertyReadOnly &&
            nextProperty &&
            // TODO: say why not newline. because if it's readonly it'll add its own
            !isNextPropertyReadOnly
          ) {
            writer.newLine();
          }
        },
        text(writer) {
          const isReadOnlyAndTyped =
            'readonly' in property && property.readonly && property.type;

          const isTyped = property.type;

          writer.write(
            isReadOnlyAndTyped
              ? `{${property.type.text}} ${property.name}`
              : isTyped
                ? `{${property.type.text}} ${property.name}`
                : `${property.name}`,
          );

          if (
            'description' in property &&
            typeof property.description === 'string'
          ) {
            // Multi-line comments are hard to read unless we indent them. Figured
            // the juice isn't worth the squeeze given the complexity of indenting
            // them just so. So we reduce the comment to a single line.
            writer.write(` - ${property.description.replaceAll('\n', '')}`);
          }
        },
      });
    }
  }

  return tags;
};
