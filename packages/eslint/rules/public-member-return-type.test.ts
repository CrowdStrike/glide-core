import { RuleTester } from '@typescript-eslint/rule-tester';
import { publicMemberReturnType } from './public-member-return-type.js';

const ruleTester = new RuleTester();

ruleTester.run('public-member-return-type', publicMemberReturnType, {
  valid: [
    {
      code: `
        export default class {
          method(): boolean {}
        }
      `,
    },
    {
      code: `
        export default class {
          #method() {}
        }
      `,
    },
    {
      code: `
        export default class {
          private method() {}
        }
      `,
    },
    {
      code: `
        export default class {
          privateMethod() {}
        }
      `,
    },
    {
      code: `
        export default class {
          constructor() {}
        }
      `,
    },
    {
      code: `
        export default class {
          override method() {}
        }
      `,
    },
    {
      code: `
        export default class {
          set property() {}
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        export default class {
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
