import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { noToHaveAttribute } from './no-to-have-attribute.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('no-to-have-attribute', noToHaveAttribute, {
  valid: [
    {
      code: "expect(host).getAttribute('role');",
    },
    {
      code: "expect(host).hasAttribute('selected');",
    },
  ],
  invalid: [
    {
      code: "expect(host).to.have.attribute('aria-checked', 'true');",
      errors: [{ messageId: 'noToHaveAttribute' }],
    },
    {
      code: "expect(host).to.have.attribute('aria-disabled');",
      errors: [{ messageId: 'noToHaveAttribute' }],
    },
  ],
});
