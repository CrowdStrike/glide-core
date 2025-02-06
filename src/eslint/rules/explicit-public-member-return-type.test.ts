import { RuleTester } from '@typescript-eslint/rule-tester';
import { explicitPublicMemberReturnType } from './explicit-public-member-return-type.js';

const ruleTester = new RuleTester();

ruleTester.run(
  'explicit-public-member-return-type',
  explicitPublicMemberReturnType,
  {
    valid: [
      {
        code: `export default class extends LitElement {
          method(): boolean {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          #method() {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          private method() {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          privateMethod() {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          constructor() {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          override method() {}
        }`,
      },
      {
        code: `export default class extends LitElement {
          set property() {}
        }`,
      },
    ],
    invalid: [
      {
        code: `export default class extends LitElement {
          method() {}
        }`,
        errors: [
          {
            messageId: 'addReturnType',
          },
        ],
      },
    ],
  },
);
