import { RuleTester } from '@typescript-eslint/rule-tester';
import { test } from '@playwright/test';
import { noSpacePress } from './no-space-press.js';

RuleTester.afterAll = test.afterAll;
RuleTester.describe = test.describe;
RuleTester.it = test;

const ruleTester = new RuleTester();

ruleTester.run('no-space-press', noSpacePress, {
  valid: [
    {
      code: "await sendKeys({ down: 'Shift' })",
    },
    {
      code: "await sendKeys({ press: 'Shift' })",
    },
    {
      code: "await sendKeys({ up: 'Shift' })",
    },
    {
      code: "some.nested.key.thing === 'Space'",
    },
    {
      code: "some.nested.key.thing === ' '",
    },
  ],
  invalid: [
    {
      code: "sendKeys({ down: 'Space' });",
      output: "sendKeys({ down: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "await sendKeys({ down: 'Space' });",
      output: "await sendKeys({ down: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "sendKeys({ press: 'Space' });",
      output: "sendKeys({ press: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "await sendKeys({ press: 'Space' });",
      output: "await sendKeys({ press: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "sendKeys({ up: 'Space' });",
      output: "sendKeys({ up: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "await sendKeys({ up: 'Space' });",
      output: "await sendKeys({ up: ' ' });",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "event.key === 'Space'",
      output: "event.key === ' '",
      errors: [{ messageId: 'preferWhitespace' }],
    },
    {
      code: "event.key !== 'Space'",
      output: "event.key !== ' '",
      errors: [{ messageId: 'preferWhitespace' }],
    },
  ],
});
