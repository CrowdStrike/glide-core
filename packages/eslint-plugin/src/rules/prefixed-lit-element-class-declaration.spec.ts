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
        code: 'export default class CsAccordion extends LitElement {}',
      },
      {
        code: 'export default class NonLitElement {}',
      },
      {
        code: 'class CsAccordion extends LitElement {}',
      },
      {
        code: 'class NonLitElement {}',
      },
    ],
    invalid: [
      {
        code: 'export default class Accordion extends LitElement {}',
        output: 'export default class CsAccordion extends LitElement {}',
        errors: [
          {
            messageId: 'addPrefix',
          },
        ],
      },
      {
        code: 'class Component extends LitElement {}',
        output: 'class CsComponent extends LitElement {}',
        errors: [
          {
            messageId: 'addPrefix',
          },
        ],
      },
    ],
  },
);
