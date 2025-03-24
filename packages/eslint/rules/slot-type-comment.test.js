"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rule_tester_1 = require("@typescript-eslint/rule-tester");
const slot_type_comment_js_1 = require("./slot-type-comment.js");
const ruleTester = new rule_tester_1.RuleTester();
const classMap = () => null;
ruleTester.run('slot-type-comment', slot_type_comment_js_1.slotTypeComment, {
    valid: [
        {
            code: `
        export default class {
          render() {
            return html\`
              <slot>
                <!-- @type {Element} -->
              </slot>
            \`
          }
        }
      `,
        },
    ],
    invalid: [
        {
            code: `
        export default class {
          render() {
            return html\`
              <slot></slot>
            \`
          }
        }
      `,
            errors: [
                {
                    messageId: 'addSlotComment',
                },
            ],
        },
        {
            code: `
        export default class {
          render() {
            return html\`
              <slot class=${classMap()}>
                <!-- @require -->
              </slot>
            \`
          }
        }
      `,
            errors: [
                {
                    messageId: 'addSlotTypeComment',
                },
            ],
        },
        {
            code: `
        export default class {
          render() {
            return html\`
              <slot>
                <!-- @type Element -->
              </slot>
            \`
          }
        }
      `,
            errors: [
                {
                    messageId: 'addSlotTypeCommentType',
                },
            ],
        },
    ],
});
