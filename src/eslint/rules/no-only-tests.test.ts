import { RuleTester } from '@typescript-eslint/rule-tester';
import { noOnlyTests } from './no-only-tests.js';

const ruleTester = new RuleTester();

ruleTester.run('no-only-tests', noOnlyTests, {
  valid: [
    {
      code: "test('is a valid test', function () {})",
    },
    {
      code: "test.skip('uses some other method on test', function () {})",
    },
    {
      // Verifies we ignore CallExpressions without `arguments`, which would mean
      // we aren't using `test` as a function (for some reason).
      code: 'test',
    },
  ],
  invalid: [
    {
      code: "test.only('is onlying a test', function () {})",
      errors: [{ messageId: 'noOnly' }],
    },
  ],
});
