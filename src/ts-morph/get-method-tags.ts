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
    const methods = [...declaration.members]
      .filter((member) => {
        if ('privacy' in member && member.privacy === 'private') {
          return false;
        }

        const isUninteresting =
          member.kind === 'method' && !['click', 'focus'].includes(member.name);

        return isUninteresting && !member.name.startsWith('private');
      })
      .sort((a, b) => (a.name < b.name ? -1 : 1));

    for (const [index, method] of methods.entries()) {
      tags.push({
        tagName: 'method',
        leadingTrivia(writer) {
          // TODO: rethink this index stuff
          if (index === 0) {
            writer.newLine();
          }
        },
        trailingTrivia(writer) {
          const nextMethod = methods.at(index + 1);

          const isThisMethodReturn =
            'return' in method && method.return?.type?.text !== 'void';

          const isThisMethodParameters = 'parameters' in method;

          const isNextMethodReturn =
            nextMethod &&
            'return' in nextMethod &&
            nextMethod.return?.type?.text !== 'void';

          const isNextMethodParameters =
            nextMethod && 'parameters' in nextMethod;

          if (!isThisMethodReturn && isNextMethodReturn) {
            writer.newLine();
          } else if (
            !isThisMethodReturn &&
            !isThisMethodParameters &&
            isNextMethodParameters
          ) {
            writer.newLine();
          }
        },
        text(writer) {
          writer.write(method.name);

          if ('description' in method && method.description) {
            // Multi-line comments are hard to read unless we indent them. Figured
            // the juice isn't worth the squeeze given the complexity of indenting
            // them just so. So we reduce the comment to a single line.
            writer.write(` - ${method.description.replaceAll('\n', '')}`);
          }
        },
      });

      if ('parameters' in method && method.parameters) {
        for (const parameter of method.parameters) {
          tags.push({
            tagName: 'param',
            trailingTrivia(writer) {
              const hasReturn =
                'return' in method && method.return?.type?.text !== 'void';

              const isLastParameter = method.parameters?.at(-1) === parameter;
              const isLastMethod = methods?.at(-1) === method;

              if (!hasReturn && isLastParameter && !isLastMethod) {
                writer.newLine();
              }
            },
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
                  // the juice isn't worth the squeeze given the complexity of indenting
                  // them just so. So we reduce the comment to a single line.
                  ` - ${parameter.description.replaceAll('\n', '')}`,
                );
              }
            },
          });
        }
      }

      if ('return' in method && method.return?.type.text !== 'void') {
        tags.push({
          tagName: 'returns',
          trailingTrivia(writer) {
            const isLastMethod = method === methods.at(-1);

            if (!isLastMethod) {
              writer.newLine();
            }
          },
          text(writer) {
            if (method.return?.type.text) {
              writer.write(`${method.return.type.text}`);
            }
          },
        });
      }
    }
  }

  return tags;
};
