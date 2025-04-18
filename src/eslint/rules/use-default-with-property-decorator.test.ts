import { RuleTester } from '@typescript-eslint/rule-tester';
import { useDefaultWithPropertyDecorator } from './use-default-with-property-decorator.js';

const ruleTester = new RuleTester();

ruleTester.run(
  'use-default-with-property-decorator',
  useDefaultWithPropertyDecorator,
  {
    valid: [
      {
        code: `
          class Component {
            @property({ reflect: true })
            name = "";
          }
        `,
      },
      {
        code: `
          class Component extends LitElement {
            @property({ reflect: true, useDefault: true })
            name = "";
          }
        `,
      },
      {
        code: `
          class Component extends LitElement {
            @property({ reflect: true })
            name: string;
          }
        `,
      },
      {
        code: `
          class Component extends LitElement {
            @property({ useDefault: false })
            name = "";
          }
        `,
      },
      {
        code: `
          class Component extends LitElement {
            @property()
            name = "";
          }
        `,
      },
      {
        code: `
          class Component extends LitElement {
            @property({ reflect: true, type: Boolean })
            disabled = false
          }
        `,
      },
    ],
    invalid: [
      {
        code: `
          class Component extends LitElement {
            @property({ reflect: true })
            name = "";
          }
        `,
        errors: [{ messageId: 'useDefaultWithPropertyDecorator' }],
      },
    ],
  },
);
