import { RuleTester } from '@typescript-eslint/rule-tester';
import { noOnlyTests } from './no-only-tests.js';

const ruleTester = new RuleTester();

ruleTester.run('no-only-tests', noOnlyTests, {
  valid: [
    {
      code: "it('is a valid test', function () {})",
    },
    {
      code: "it.skip('uses some other method on it', function () {})",
    },
    {
      // Verifies we ignore CallExpressions without `arguments`, which would mean
      // we aren't using `it` as a function (for some reason).
      code: 'it',
    },
  ],
  invalid: [
    {
      code: "it.only('is onlying a test', function () {})",
      errors: [{ messageId: 'noOnly' }],
    },
  ],
});
