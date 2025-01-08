import { RuleTester } from '@typescript-eslint/rule-tester';
import { noSkipTests } from './no-skip-tests.js';

const ruleTester = new RuleTester();

ruleTester.run('no-skip-tests', noSkipTests, {
  valid: [
    {
      code: "test('is a valid test', function () {})",
    },
    {
      code: "test.only('uses some other method on test', function () {})",
    },
    {
      // Verifies we ignore CallExpressions without `arguments`, which would mean
      // we aren't using `test` as a function (for some reason).
      code: 'test',
    },
  ],
  invalid: [
    {
      code: "test.skip('is skipping a test', function () {})",
      errors: [{ messageId: 'noSkip' }],
    },
  ],
});
