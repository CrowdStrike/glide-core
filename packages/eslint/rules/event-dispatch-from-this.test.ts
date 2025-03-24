import { RuleTester } from '@typescript-eslint/rule-tester';
import { eventDispatchFromThis } from './event-dispatch-from-this.js';

const ruleTester = new RuleTester();

ruleTester.run('event-dispatch-from-this', eventDispatchFromThis, {
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
