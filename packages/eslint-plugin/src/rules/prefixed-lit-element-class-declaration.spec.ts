import { RuleTester } from '@typescript-eslint/rule-tester';
import { prefixedClassDeclaration } from './prefixed-lit-element-class-declaration.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run(
  'prefixed-lit-element-class-declaration',
  prefixedClassDeclaration,
  {
    valid: [
      {
        code: 'export default class GlideCoreAccordion extends LitElement {}',
      },
      {
        code: 'export default class NonLitElement {}',
      },
      {
        code: 'class GlideCoreAccordion extends LitElement {}',
      },
      {
        code: 'class NonLitElement {}',
      },
    ],
    invalid: [
      {
        code: 'export default class Accordion extends LitElement {}',
        output: 'export default class GlideCoreAccordion extends LitElement {}',
        errors: [
          {
            messageId: 'addPrefix',
          },
        ],
      },
      {
        code: 'class Component extends LitElement {}',
        output: 'class GlideCoreComponent extends LitElement {}',
        errors: [
          {
            messageId: 'addPrefix',
          },
        ],
      },
    ],
  },
);
