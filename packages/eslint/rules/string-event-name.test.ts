import { RuleTester } from '@typescript-eslint/rule-tester';
import { stringEventName } from './string-event-name.js';

const ruleTester = new RuleTester();

ruleTester.run('string-event-name', stringEventName, {
  valid: [
    {
      code: `
        this.dispatchEvent(new Event('change'));
      `,
    },
    {
      code: `
        this.dispatchEvent(new CustomEvent('change'));
      `,
    },
  ],
  invalid: [
    {
      code: `
        const variable = 'change';
        this.dispatchEvent(new Event(variable));
      `,
      errors: [
        {
          messageId: 'stringEventName',
        },
      ],
    },
    {
      code: `
        const variable = 'change';
        this.dispatchEvent(new CustomEvent(variable));
      `,
      errors: [
        {
          messageId: 'stringEventName',
        },
      ],
    },
  ],
});
