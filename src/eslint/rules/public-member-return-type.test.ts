import { RuleTester } from '@typescript-eslint/rule-tester';
import { publicMemberReturnType } from './public-member-return-type.js';

const ruleTester = new RuleTester();

ruleTester.run('public-member-return-type', publicMemberReturnType, {
  valid: [
    {
      code: `
        export default class Component extends LitElement {
          method(): boolean {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          #method() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          private method() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          privateMethod() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          constructor() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          override method() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends LitElement  {
          set property() {}
        }
      `,
    },
    {
      code: `
        export default class Component extends Element  {
          method() {}
        }
      `,
    },
    {
      code: `
        export default class {
          method() {}
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        export default class Component extends LitElement  {
          method() {}
        }
      `,
      errors: [
        {
          messageId: 'addReturnType',
        },
      ],
    },
  ],
});
