import { RuleTester } from '@typescript-eslint/rule-tester';
import { noSkipTests } from './no-skip-tests.js';

const ruleTester = new RuleTester();

ruleTester.run('no-skip-tests', noSkipTests, {
  valid: [
    {
      code: "it('is a valid test', function () {})",
    },
    {
      code: "it.only('uses some other method on it', function () {})",
    },
    {
      // Verifies we ignore CallExpressions without `arguments`, which would mean
      // we aren't using `it` as a function (for some reason).
      code: 'it',
    },
  ],
  invalid: [
    {
      code: "it.skip('is skipping a test', function () {})",
      errors: [{ messageId: 'noSkip' }],
    },
  ],
});
