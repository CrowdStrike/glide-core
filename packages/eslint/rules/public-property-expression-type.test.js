"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const public_property_expression_type_js_1 = require("./public-property-expression-type.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('public-property-type', public_property_expression_type_js_1.publicPropertyExpressionType, {
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
