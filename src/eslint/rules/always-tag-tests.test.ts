import { RuleTester } from '@typescript-eslint/rule-tester';
import { alwaysTagTests } from './always-tag-tests.js';

const ruleTester = new RuleTester();

ruleTester.run('always-tag-tests', alwaysTagTests, {
  valid: [
    {
      code: `
        test('registers', { tag: '@events' }, async () => {});
      `,
    },
    {
      code: `
        test('registers', { annotation: { type: 'type' }, tag: '@events' }, async () => {});
      `,
    },
  ],
  invalid: [
    {
      code: `
        test('registers', async () => {});
      `,
      errors: [{ messageId: 'alwaysTagTests' }],
    },
    {
      code: `
        test('registers', {}, async () => {});
      `,
      errors: [{ messageId: 'alwaysTagTests' }],
    },
    {
      code: `
        test('registers', { annotation: { type: 'type' } }, async () => {});
      `,
      errors: [{ messageId: 'alwaysTagTests' }],
    },
  ],
});
