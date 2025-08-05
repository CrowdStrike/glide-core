import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { publicPropertyExpressionType } from './public-property-expression-type.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('public-property-type', publicPropertyExpressionType, {
  valid: [
    {
      code: `
        export default class {
          version: string = packageJson.version;
        }
      `,
    },
    {
      code: `
        export default class {
          #version = packageJson.version;
        }
      `,
    },
    {
      code: `
        export default class {
          privateVersion = packageJson.version;
        }
      `,
    },
    {
      code: `
        export default class {
          version = '0.0.1';
        }
      `,
    },
  ],
  invalid: [
    {
      code: `
        export default class {
          id = uniqueId();
        }
      `,
      errors: [
        {
          messageId: 'addExplicitType',
        },
      ],
    },
    {
      code: `
        export default class {
          disabled = true ? true : false;
        }
      `,
      errors: [
        {
          messageId: 'addExplicitType',
        },
      ],
    },
    {
      code: `
        export default class {
          disabled = true || false;
        }
      `,
      errors: [
        {
          messageId: 'addExplicitType',
        },
      ],
    },
    {
      code: `
        export default class {
          version = packageJson.version;
        }
      `,
      errors: [
        {
          messageId: 'addExplicitType',
        },
      ],
    },
  ],
});
