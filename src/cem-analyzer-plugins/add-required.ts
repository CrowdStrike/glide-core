import { type Module } from 'custom-elements-manifest' with { type: 'json' };
import { isDecorator, type Node } from 'typescript';
import getParentClassName from '../library/get-parent-class-name.js';

/**
 * Adds to every attribute in the manifest a `required` property
 * if the attribute has a `@required` decorator.
 */
export default () => {
  return {
    name: 'add-required',
    analyzePhase({ moduleDoc, node }: { moduleDoc: Module; node: Node }) {
      if (
        isDecorator(node) &&
        node.expression.getText() === 'required' &&
        moduleDoc.declarations
      ) {
        for (const declaration of moduleDoc.declarations) {
          if (
            'attributes' in declaration &&
            declaration.attributes &&
            getParentClassName(node) === declaration.name
          ) {
            for (const attribute of declaration.attributes) {
              if (
                'name' in attribute &&
                attribute.name &&
                attribute.name === node.parent.name?.getText()
              ) {
                // @ts-expect-error `required` isn't a standard manifest
                // property. But we otherwise wouldn't have a way to express
                // that a property is required.
                attribute.required = true;
              }
            }
          }
        }
      }
    },
  };
};
