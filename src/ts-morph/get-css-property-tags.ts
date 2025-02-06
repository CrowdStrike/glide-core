import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if ('cssProperties' in declaration && declaration.cssProperties) {
    const properties = [...declaration.cssProperties].sort((a, b) => {
      return a.name < b.name ? -1 : 1;
    });

    for (const [index, property] of properties.entries()) {
      tags.push({
        tagName: 'cssprop',
        leadingTrivia(writer) {
          writer.conditionalNewLine(index === 0);
        },
        text(writer) {
          const hasDescription =
            'description' in property && property.description;

          writer.write(
            hasDescription
              ? // Multi-line comments are hard to read unless we indent them. Figured
                // the juice isn't worth the squeeze given the complexity of indenting
                // them just so. So we reduce the comment to a single line.
                `[${property.name}=${property.default}] - ${property.description.replaceAll('\n', '')}`
              : `[${property.name}=${property.default}]`,
          );
        },
      });
    }
  }

  return tags;
};
