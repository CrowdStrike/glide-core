import { type Module } from 'custom-elements-manifest' with { type: 'json' };
import {
  isCallExpression,
  isClassDeclaration,
  isExpressionWithTypeArguments,
  isIdentifier,
  isNewExpression,
  isPropertyAccessExpression,
  isStringLiteral,
  SyntaxKind,
  type Node,
} from 'typescript';
import getParentClassName from '../library/get-parent-class-name.js';

/**
 * Adds dispatched events to the manifest.
 *
 * 1. Add an "invalid" event to the manifest if a node implements `FormControl`.
 * 2. If the node has `this.dispatchEvent` calls, add those events too.
 *
 * Events dispatched from within class methods are picked up without this plugin.
 * But events dispatched from getters and setters are not because only¹ methods
 * are visited. "invalid" events are also not picked up. Though the authors of
 * the library would have no way to do so reliably. We wouldn't need this plugin
 * if not for these two cases.
 *
 * 1: https://github.com/open-wc/custom-elements-manifest/blob/e7ec7424aa418b220fc4ec7e70464b4d6f35b596/packages/analyzer/src/features/analyse-phase/creators/createClass.js#L151-L153
 */
export default () => {
  return {
    name: 'add-events',
    analyzePhase({ moduleDoc, node }: { moduleDoc: Module; node: Node }) {
      if (isClassDeclaration(node) && node.heritageClauses) {
        const isImplementsFormControl =
          isClassDeclaration(node) &&
          node.heritageClauses.some((clause) => {
            return clause.types.some((type) => {
              return (
                isExpressionWithTypeArguments(type) &&
                isIdentifier(type.expression) &&
                type.expression.text === 'FormControl'
              );
            });
          });

        // A component implementing `FormControl` is our best heurstic for
        // whether the component dispatches an "invalid" events. Simply checking
        // for a static `formAssociated` property would wrongly include components
        // like Button.
        if (isImplementsFormControl && moduleDoc.declarations) {
          for (const declaration of moduleDoc.declarations) {
            if (
              'events' in declaration &&
              declaration.events &&
              getParentClassName(node) === declaration.name
            ) {
              declaration.events.push({
                name: 'invalid',
                type: {
                  text: 'Event',
                },
              });
            }
          }
        }
      }

      if (
        isCallExpression(node) &&
        isPropertyAccessExpression(node.expression) &&
        node.expression.name.getText() === 'dispatchEvent' &&
        node?.expression.expression.kind === SyntaxKind.ThisKeyword &&
        node.arguments
      ) {
        for (const argument of node.arguments) {
          if (isNewExpression(argument) && argument.arguments) {
            const firstArgument = argument.arguments.at(0);

            if (firstArgument && isStringLiteral(firstArgument)) {
              // `text` instead of `getText()` because `getText()` returns
              // an escaped value and so is doubly quoted.
              const eventName = firstArgument.text;

              if (moduleDoc.declarations) {
                for (const declaration of moduleDoc.declarations) {
                  if (
                    'events' in declaration &&
                    declaration.events &&
                    getParentClassName(node) === declaration.name
                  ) {
                    const isNew = declaration.events.every(
                      ({ name }) => name !== eventName,
                    );

                    if (
                      isNew &&
                      eventName &&
                      isIdentifier(argument.expression)
                    ) {
                      declaration.events.push({
                        name: eventName,
                        type: {
                          text: argument.expression.text,
                        },
                      });
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
