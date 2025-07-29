import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { slotTypeComment } from './slot-type-comment.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();
const classMap = () => null;

ruleTester.run('slot-type-comment', slotTypeComment, {
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
