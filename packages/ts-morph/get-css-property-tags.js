import {} from 'ts-morph';
import manifest from '../../custom-elements.json' with { type: 'json' };
export default (declaration) => {
    const tags = [];
    const isCssProperties = 'cssProperties' in declaration;
    if (!isCssProperties) {
        return tags;
    }
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
                writer.write(`[${property.name}=${property.default}]`);
                if ('description' in property && property.description) {
                    // Multi-line comments are hard to read unless we indent them. Figured
                    // doing so isn't worthwhile given the complexity of indenting them
                    // correctly. So we simply reduce the comment to a single line.
                    writer.write(` - ${property.description.replaceAll('\n', ' ')}`);
                }
            },
        });
    }
    return tags;
};
