"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const event_dispatch_from_this_js_1 = require("./event-dispatch-from-this.js");
const ruleTester = new rule_tester_1.RuleTester();
ruleTester.run('event-dispatch-from-this', event_dispatch_from_this_js_1.eventDispatchFromThis, {
    valid: [
        {
            code: `
        export default class {
          method() {
            this.dispatchEvent(new Event('change'))
          }
        }
      `,
        },
    ],
    invalid: [
        {
            code: `
        export default class {
          method() {
            this.element.dispatchEvent(new Event('change'))
          }
        }
      `,
            errors: [
                {
                    messageId: 'dispatchFromThis',
                },
            ],
        },
        {
            code: `
        export default class {
          method() {
            document.querySelector('input').dispatchEvent(new Event('change'))
          }
        }
      `,
            errors: [
                {
                    messageId: 'dispatchFromThis',
                },
            ],
        },
    ],
});
