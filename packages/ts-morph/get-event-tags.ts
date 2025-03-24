import { type JSDocTagStructure, type OptionalKind } from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };

export default (
  declaration: (typeof manifest)['modules'][number]['declarations'][number],
) => {
  const tags: OptionalKind<JSDocTagStructure>[] = [];
  const isEvents = 'events' in declaration;

  if (!isEvents) {
    return tags;
  }

  const events = [...declaration.events]
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .filter((event) => !event.name?.startsWith('private'));

  for (const [index, event] of events.entries()) {
    tags.push({
      tagName: 'fires',
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

  return tags;
};
