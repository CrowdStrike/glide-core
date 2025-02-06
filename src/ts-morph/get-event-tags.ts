import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];

  if ('events' in declaration && declaration.events) {
    const events = [...declaration.events]
      .filter((event) => {
        return !event.name?.startsWith('private');
      })
      .sort((a, b) => (a.name < b.name ? -1 : 1));

    for (const [index, event] of events.entries()) {
      tags.push({
        tagName: 'fire',
        leadingTrivia(writer) {
          writer.conditionalNewLine(index === 0);
        },
        text(writer) {
          writer.write(
            event.type?.text
              ? `{${event.type?.text}} ${event.name}`
              : `${event.name}`,
          );
        },
      });
    }
  }

  return tags;
};
