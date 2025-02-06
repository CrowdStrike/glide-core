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

  const methods = [...declaration.members]
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .filter((member) => {
      const isPrivate = 'privacy' in member && member.privacy === 'private';
      const isPseudoPrivate = member.name.startsWith('private');
      const isIgnore = ['click', 'focus'].includes(member.name);

      return (
        !isPrivate && !isPseudoPrivate && !isIgnore && member.kind === 'method'
      );
    });

  for (const [index, method] of methods.entries()) {
    tags.push({
      tagName: 'method',
      leadingTrivia(writer) {
        if (index === 0) {
          writer.newLine();
          return;
        }

        const currentMethodHasParameters = 'parameters' in method;

        const currentMethodHasReturn =
          'return' in method && method.return?.type.text !== 'void';

        const previousMethod = methods.at(index - 1);

        const previousMethodHasParameters =
          previousMethod && 'parameters' in previousMethod;

        const previousMethodHasReturn =
          previousMethod &&
          'return' in previousMethod &&
          previousMethod.return?.type.text !== 'void';

        if (
          currentMethodHasParameters ||
          currentMethodHasReturn ||
          previousMethodHasParameters ||
          previousMethodHasReturn
        ) {
          writer.newLine();
        }
      },
      text(writer) {
        writer.write(method.name);

        if ('description' in method && method.description) {
          // Multi-line comments are hard to read unless we indent them. Figured
          // doing so isn't worthwhile given the complexity of indenting them just
          // so. We reduce the comment to a single line instead.
          writer.write(` - ${method.description.replaceAll('\n', ' ')}`);
        }
      },
    });

    if ('parameters' in method && method.parameters) {
      for (const parameter of method.parameters) {
        tags.push({
          tagName: 'param',
          text(writer) {
            if ('optional' in parameter && parameter.type) {
              writer.write(`{${parameter.type.text}} [${parameter.name}]`);
            } else if (parameter.type) {
              writer.write(`{${parameter.type.text}} ${parameter.name}`);
            } else {
              writer.write(parameter.name);
            }

            if (
              'description' in parameter &&
              typeof parameter.description === 'string'
            ) {
              writer.write(
                // Multi-line comments are hard to read unless we indent them. Figured
                // doing so isn't worthwhile given the complexity of indenting them just
                // so. So we simply reduce the comment to a single line.
                ` - ${parameter.description.replaceAll('\n', ' ')}`,
              );
            }
          },
        });
      }
    }

    if ('return' in method && method.return?.type.text !== 'void') {
      tags.push({
        tagName: 'returns',
        text(writer) {
          if (method.return?.type.text) {
            writer.write(`${method.return.type.text}`);
          }
        },
      });
    }
  }

  return tags;
};
