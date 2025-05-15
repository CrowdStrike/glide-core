import { RuleTester } from '@typescript-eslint/rule-tester';
import { privateStateDecorators } from './private-state-decorators.js';

const ruleTester = new RuleTester();

ruleTester.run('private-state-decorators', privateStateDecorators, {
  valid: [
    {
      code: `
        class Component extends LitElement {
          @state()
          private open = true;
        }
      `,
    },
    {
      code: `
        class Component extends LitElement {
          @state()
          private readonly open = true;
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        class Component extends LitElement {
          @state()
          open = true;
        }
      `,
      errors: [{ messageId: 'privateStateDecorators' }],
    },
    {
      code: `
        class Component extends LitElement {
          @state()
          readonly open = true;
        }
      `,
      errors: [{ messageId: 'privateStateDecorators' }],
    },
  ],
});
