import nodePath from 'node:path';
import { type Module } from 'custom-elements-manifest' with { type: 'json' };
import {
  isClassDeclaration,
  isImportDeclaration,
  isStringLiteral,
  isTaggedTemplateExpression,
  isTemplateExpression,
  type Node,
} from 'typescript';
import postcss, { Comment, Declaration, Rule } from 'postcss';
import getParentClassName from '../library/get-parent-class-name.js';

/**
 * Adds custom properties to the manifest. Custom properties in `:host`
 * selectors are considered public and are added.
 *
 * Collect
 *
 * 1. Get the styles from every component stylesheet.
 * 2. Parse the stylesheet.
 * 3. Find all the custom properties in `:host` selectors.
 * 4. Add each custom property to `context.stylesheets`.
 *
 * Analyze
 *
 * 1. Get the file path of each class's stylesheet import statement.
 * 2. Look up the file path in `context.stylesheets`.
 * 3. Add every custom property to the manifest.
 */
export default () => {
  return {
    name: 'add-custom-properties',
    collectPhase({
      context,
      node,
    }: {
      // `context` is in part for passing arbitrary data around like we're doing.
      // https://custom-elements-manifest.open-wc.org/analyzer/plugins/authoring/#context
      context: {
        stylesheets?: Record<
          string,
          [{ name: string; default: string; description?: string }]
        >;
      };
      node: Node;
    }) {
      if (
        isTaggedTemplateExpression(node) &&
        node.tag.getText() === 'css' &&
        node.getSourceFile().fileName.includes('.styles.')
      ) {
        let stylesheet: postcss.Root;

        const text = isTemplateExpression(node.template)
          ? // Tagged template literals with at least one expression don't have
            // a `text` property, which for literals without an expression
            // is the contents of the template literal.
            //
            // Ones with an expression only have a `getText()` method, which returns
            // the full text including the tag and its backticks.
            //
            // To make them parsable, we remove the tag, its backticks, all the expressions.
            node
              .getText()
              .replace(/css`??/, '')
              .replaceAll(/\${.*}/g, '')
              .replaceAll(/`$/gm, '')
          : node.template.text;

        try {
          stylesheet = postcss.parse(text);
        } catch (error) {
          if (error instanceof Error) {
            error.message = node.getSourceFile().fileName;
          }

          throw error;
        }

        if (stylesheet) {
          for (const ruleNode of stylesheet.nodes) {
            if (ruleNode instanceof Rule && ruleNode.selector === ':host') {
              for (const declarationNode of ruleNode.nodes) {
                if (
                  declarationNode instanceof Declaration &&
                  declarationNode.prop.startsWith('--')
                ) {
                  const fileName = nodePath.basename(
                    node.getSourceFile().fileName,
                  );

                  const comment = declarationNode.parent?.nodes.findLast(
                    (node) => {
                      return (
                        node.source?.end?.line &&
                        declarationNode.source?.start?.line &&
                        node.source.end.line ===
                          declarationNode.source.start.line - 1
                      );
                    },
                  );

                  // Undefined if it's the first custom property in the stylesheet.
                  if (!context.stylesheets) {
                    context.stylesheets = {};
                  }

                  const customProperty = {
                    name: declarationNode.prop,
                    default: declarationNode.value,
                    description:
                      comment instanceof Comment ? comment.text : undefined,
                  };

                  const isNew = context.stylesheets[fileName]?.every(
                    ({ name }) => name !== customProperty.name,
                  );

                  if (context.stylesheets[fileName] && isNew) {
                    context.stylesheets[fileName].push(customProperty);
                  } else if (!context.stylesheets[fileName]) {
                    context.stylesheets[fileName] = [customProperty];
                  }
                }
              }
            }
          }
        }
      }
    },
    analyzePhase({
      context,
      moduleDoc,
      node,
    }: {
      context: {
        stylesheets?: Record<
          string,
          [{ name: string; default: string; description?: string }]
        >;
      };
      moduleDoc: Module;
      node: Node;
    }) {
      if (!isClassDeclaration(node)) {
        return;
      }

      const isComponent = node.heritageClauses?.some((clause) => {
        return clause.types.some((type) => {
          return type.getText() === 'LitElement';
        });
      });

      if (!isComponent) {
        return;
      }

      for (const statement of node.getSourceFile().statements) {
        if (
          isImportDeclaration(statement) &&
          isStringLiteral(statement.moduleSpecifier) &&
          statement.moduleSpecifier.text.includes('.styles.') &&
          moduleDoc.declarations
        ) {
          for (const declaration of moduleDoc.declarations) {
            if (
              getParentClassName(node) === declaration.name &&
              context.stylesheets
            ) {
              // Import statements have a `.js` extension. While the stylesheet
              // itself has a `.ts` extension. And a filename with the latter
              // is the map key. So we TODO
              const fileName =
                statement.moduleSpecifier.text.slice(
                  0,
                  Math.max(0, statement.moduleSpecifier.text.lastIndexOf('.')),
                ) + '.ts';

              if ('cssProperties' in declaration && declaration.cssProperties) {
                const stylesheet =
                  context.stylesheets[nodePath.basename(fileName)];

                if (stylesheet) {
                  for (const property of stylesheet) {
                    const isNew = declaration.cssProperties.every(
                      ({ name }) => name !== property.name,
                    );

                    if (isNew) {
                      declaration.cssProperties.push(property);
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
  };
};
