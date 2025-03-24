"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const public_member_return_type_js_1 = require("./public-member-return-type.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('public-member-return-type', public_member_return_type_js_1.publicMemberReturnType, {
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
