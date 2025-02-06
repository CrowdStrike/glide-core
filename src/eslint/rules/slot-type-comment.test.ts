import { RuleTester } from '@typescript-eslint/rule-tester';
import { slotTypeComment } from './slot-type-comment.js';

const ruleTester = new RuleTester();
const classMap = (classes: Record<string, string>) => classes;

ruleTester.run('slot-type-comment', slotTypeComment, {
  valid: [
    {
      code: `export default class extends LitElement {
        render() {
          return html\`
            <slot>
              <!-- @type {Element} -->
            </slot>
          \`
        }
      }`,
    },
  ],
  invalid: [
    {
      code: `export default class extends LitElement {
        render() {
          return html\`
            <slot></slot>
          \`
        }
      }`,
      errors: [
        {
          messageId: 'addSlotComment',
        },
      ],
    },
    {
      code: `export default class extends LitElement {
        render() {
          return html\`
            <slot class=${classMap({ test: 'true' })} name="description">
              <!-- @require -->
            </slot>
          \`
        }
      }`,
      errors: [
        {
          messageId: 'addSlotTypeComment',
        },
      ],
    },
    {
      code: `export default class extends LitElement {
        render() {
          return html\`
            <slot>
              <!-- @type Element -->
            </slot>
          \`
        }
      }`,
      errors: [
        {
          messageId: 'addSlotTypeCommentType',
        },
      ],
    },
  ],
});
