import { RuleTester } from '@typescript-eslint/rule-tester';
import { noPrefixedEventName } from './no-cs-prefixed-event-name.js';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
});

ruleTester.run('no-cs-prefixed-event-name', noPrefixedEventName, {
  valid: [
    {
      code: "new Event('close')",
    },
    {
      code: "new Event('a-dasherized-event')",
    },
    {
      code: "new Event('close', { bubbles: false })",
    },
    {
      code: "new CustomEvent('event')",
    },
    {
      code: "new CustomEvent('event', { bubbles: false })",
    },
  ],
  invalid: [
    {
      code: "new Event('cs-toggle')",
      output: "new Event('toggle')",
      errors: [
        {
          messageId: 'noPrefix',
        },
      ],
    },
    {
      code: "new Event('cs-toggle', { bubbles: false })",
      output: "new Event('toggle', { bubbles: false })",
      errors: [
        {
          messageId: 'noPrefix',
        },
      ],
    },
    {
      code: "new CustomEvent('cs-toggle')",
      output: "new CustomEvent('toggle')",
      errors: [
        {
          messageId: 'noPrefix',
        },
      ],
    },
    {
      code: "new CustomEvent('cs-toggle', { bubbles: false })",
      output: "new CustomEvent('toggle', { bubbles: false })",
      errors: [
        {
          messageId: 'noPrefix',
        },
      ],
    },
  ],
});
